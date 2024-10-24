import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatchActions } from './match.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { MatchService } from '@core/services/matches.service';

@Injectable()
export class MatchEffects {
  private _action$ = inject(Actions);
  private _service = inject(MatchService);

  loadMatches$ = createEffect(() =>
    this._action$.pipe(
      ofType(MatchActions.getMatches),
      exhaustMap(({ params }) => this._service.getMatches(params)),
      map((response) => {
        const matches = this._service.convertMatchData(response.content);
        const paginationOption = {
          ...response,
          content: [],
        };
        return MatchActions.getMatchesSuccess({ matches, paginationOption });
      }),
      catchError((error) => of(MatchActions.getMatchesFailed({ error })))
    )
  );
}
