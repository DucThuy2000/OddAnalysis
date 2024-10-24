import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { vmFromLatest } from '@core/helpers/operators';
import { ILeague } from '@core/models';
import { EStateStatus, IAppState } from '@core/store/app.state';
import { LeagueActions } from '@core/store/leagues/league.actions';
import {
  currentLeagueSelector,
  leaguesSelector,
  leagueStatusSelector,
} from '@core/store/leagues/league.selectors';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { LeaguesSkeleton } from '@shared/component/skeleton/skeleton-element.component';
import { MatchActions } from '@core/store/matches/match.actions';

interface ILeagueView {
  leagues: ILeague[];
  currentLeague: ILeague | undefined;
  isLoading: boolean;
}

@Component({
  selector: 'home-leagues',
  standalone: true,
  imports: [CommonModule, LeaguesSkeleton],
  templateUrl: './leagues.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeagueComponent {
  private _store = inject(Store<IAppState>);
  vm$!: Observable<ILeagueView>;

  ngOnInit() {
    this._store.dispatch(LeagueActions.getLeagues());
    this.vm$ = vmFromLatest<ILeagueView>({
      leagues: this._store.select(leaguesSelector),
      currentLeague: this._store.select(currentLeagueSelector),
      isLoading: this._store
        .select(leagueStatusSelector)
        .pipe(map((status) => status === EStateStatus.LOADING)),
    });
  }

  onLeagueClick(league: ILeague) {
    this._store.dispatch(MatchActions.resetMatchData());
    this._store.dispatch(LeagueActions.setCurrentLeague({ league }));
  }
}
