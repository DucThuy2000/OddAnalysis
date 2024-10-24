import { inject, Injectable } from '@angular/core';
import { LeagueService } from '@core/services/league.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { LeagueActions } from './league.actions';
import { MatchActions } from '../matches/match.actions';

@Injectable()
export class LeagueEffects {
  private _action$ = inject(Actions);
  private _leagueService = inject(LeagueService);

  loadLeagues$ = createEffect(() =>
    this._action$.pipe(
      ofType(LeagueActions.getLeagues),
      mergeMap(() => this._leagueService.getLeagues()),
      concatMap((leagues) => [
        LeagueActions.getLeaguesSuccess({ leagues }),
        LeagueActions.setCurrentLeague({ league: leagues[0] }),
      ]),
      catchError((error) => of(LeagueActions.getLeaguesFailed({ error })))
    )
  );

  setCurrentLeague$ = createEffect(() =>
    this._action$.pipe(
      ofType(LeagueActions.setCurrentLeague),
      map(({ league }) =>
        MatchActions.getMatches({
          params: {
            leagueId: league.id,
          },
        })
      )
    )
  );
}
