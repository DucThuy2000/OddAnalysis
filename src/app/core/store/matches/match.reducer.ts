import { createReducer, on } from '@ngrx/store';
import { IMatchState } from './match.state';
import { EStateStatus } from '../app.state';
import { MatchActions } from './match.actions';

const initialState: IMatchState = {
  queryParams: {
    size: 20,
    page: 0,
    sort: ['string'],
    leagueId: '',
  },
  matches: [],
  paginationOption: {},
  status: EStateStatus.IDLE,
};

export const matchReducer = createReducer(
  initialState,
  on(MatchActions.getMatches, (state, action) => ({
    ...state,
    queryParams: {
      ...state.queryParams,
      leagueId: action.params.leagueId,
    },
    status: EStateStatus.LOADING,
  })),
  on(
    MatchActions.getMatchesSuccess,
    (state, { matches, paginationOption }) => ({
      ...state,
      matches: [...state.matches, ...matches],
      paginationOption: paginationOption,
      queryParams: {
        ...state.queryParams,
        page: state.queryParams.page! + 1,
      },
      status: EStateStatus.IDLE,
    })
  ),
  on(MatchActions.getMatchesFailed, (state, action) => ({
    ...state,
    matches: [],
    status: EStateStatus.ERROR,
    error: action.error,
  })),
  on(MatchActions.resetMatchData, (state) => ({
    ...state,
    matches: [],
    queryParams: {
      ...state.queryParams,
      page: 0,
      leagueId: '',
    },
    paginationOption: {},
    status: EStateStatus.IDLE,
    error: '',
  }))
);
