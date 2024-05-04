import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ILeague, IMatch, IMatchDetail } from '@shared/models';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { MatcheService } from '@shared/services/matches.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { LeagueService } from '@shared/services/league.service';
import { NotFoundDataComponent } from '@shared/component/not-found-data/not-found-data.component';
import { Router } from '@angular/router';
import { PATH, STATISTIC_QUERY_PARAMS } from '@shared/constants/routes';

@Component({
  selector: 'c-matches',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    NotFoundDataComponent,
  ],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css',
})
export class MatchesComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject<void>();
  matches: IMatch[] = [];
  leagues: ILeague[] = [];
  leagueSelected!: ILeague;

  constructor(
    private matchService: MatcheService,
    private leagueService: LeagueService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchLeaguesAndMatches();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  fetchLeaguesAndMatches(): void {
    this.leagueService
      .getLeagues()
      .pipe(
        switchMap((leagues) => {
          this.leagues = leagues || [];
          this.leagueSelected = this.leagues[0];
          return this.matchService.getMatches(this.leagueSelected.id);
        }),
        takeUntil(this._destroyed$)
      )
      .subscribe((matches) => (this.matches = matches));
  }

  fetchMatchesForSelectedLeague(): void {
    this.matchService
      .getMatches(this.leagueSelected.id)
      .pipe(takeUntil(this._destroyed$))
      .subscribe((matches) => (this.matches = matches));
  }

  onClickLeague(league: ILeague): void {
    if (league === this.leagueSelected) return;
    this.leagueSelected = league;
    this.fetchMatchesForSelectedLeague();
  }

  onClickMatch(match: IMatchDetail): void {
    if (!match) return;
    const queryParams: STATISTIC_QUERY_PARAMS = {
      league: this.leagueSelected.name.toLowerCase(),
      home: match.home.id,
      away: match.away.id,
    };

    this.router.navigate([PATH.STATISTIC], { queryParams });
  }
}
