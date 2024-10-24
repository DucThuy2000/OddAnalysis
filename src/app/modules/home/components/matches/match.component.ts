import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { vmFromLatest } from '@core/helpers/operators';
import { IMatch, IMatchDetail } from '@core/models';
import { EStateStatus, IAppState } from '@core/store/app.state';
import {
  matchesSelector,
  matchesStatusSelector,
  matchPaginationOptionSelector,
  matchQueryParams,
} from '@core/store/matches/match.selector';
import { Store } from '@ngrx/store';
import {
  EMPTY,
  map,
  Observable,
  Subject,
  switchMap,
  take,
  takeUntil,
} from 'rxjs';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { HomeMatchSkeleton } from '@shared/component/skeleton/skeleton-element.component';
import { ScrollNearEndDirective } from '@shared/directives/scroll-near-end.directive';
import { MatchActions } from '@core/store/matches/match.actions';
import { PATH, STATISTIC_QUERY_PARAMS } from '@core/constants';
import { Router } from '@angular/router';

interface IMatchesView {
  matches: IMatch[];
  isLoading: boolean;
}

@Component({
  selector: 'home-matches',
  standalone: true,
  templateUrl: './match.component.html',
  imports: [
    CommonModule,
    NzSkeletonModule,
    HomeMatchSkeleton,
    ScrollNearEndDirective,
  ],
})
export class MatchesComponent implements OnInit, OnDestroy {
  private _store = inject(Store<IAppState>);
  private _queryParams$ = this._store.select(matchQueryParams);
  private _paginationOption$ = this._store.select(
    matchPaginationOptionSelector
  );
  private _router = inject(Router);
  private _destroyed$ = new Subject<void>();

  vm$!: Observable<IMatchesView>;

  ngOnInit() {
    this.vm$ = vmFromLatest<IMatchesView>({
      matches: this._store.select(matchesSelector),
      isLoading: this._store
        .select(matchesStatusSelector)
        .pipe(map((status) => status === EStateStatus.LOADING)),
    });
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  scrollNearEnd() {
    this._paginationOption$
      .pipe(
        switchMap((option) => {
          if (option.last) {
            return EMPTY;
          }
          return this._queryParams$;
        }),
        take(1),
        takeUntil(this._destroyed$)
      )
      .subscribe((params) => {
        if (params) {
          this._store.dispatch(MatchActions.getMatches({ params }));
        }
      });
  }

  onClickMatch(match: IMatchDetail): void {
    if (!match) return;
    const queryParams: STATISTIC_QUERY_PARAMS = {
      league: '7',
      home: match.home.id,
      away: match.away.id,
    };
    this._router.navigate([PATH.STATISTIC], { queryParams });
  }
}
