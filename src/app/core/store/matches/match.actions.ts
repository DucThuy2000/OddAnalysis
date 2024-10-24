import { createAction, props } from '@ngrx/store';
import { EMatchActions } from './match.state';
import { ICommonPaginationResponse, IMatch, IMatchRequest } from '@core/models';

const getMatches = createAction(
  EMatchActions.GET,
  props<{ params: IMatchRequest }>()
);

const getMatchesSuccess = createAction(
  EMatchActions.GET_SUCCESS,
  props<{ matches: IMatch[]; paginationOption: ICommonPaginationResponse }>()
);

const getMatchesFailed = createAction(
  EMatchActions.GET_FAILED,
  props<{ error: string }>()
);

const resetMatchData = createAction(EMatchActions.RESET);

export const MatchActions = {
  getMatches,
  getMatchesSuccess,
  getMatchesFailed,
  resetMatchData,
};
