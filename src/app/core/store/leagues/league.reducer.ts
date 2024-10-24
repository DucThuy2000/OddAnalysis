import { createReducer, on } from '@ngrx/store';
import { ELeagueAction, ILeagueState } from './league.state';
import { EStateStatus } from '../app.state';
import { LeagueActions } from './league.actions';

const initialState: ILeagueState = {
  leagues: [],
  currentLeague: undefined,
  status: EStateStatus.IDLE,
};

export const leagueReducer = createReducer(
  initialState,
  on(LeagueActions.getLeagues, (state) => ({
    ...state,
    status: EStateStatus.LOADING,
  })),
  on(LeagueActions.getLeaguesSuccess, (state, action) => ({
    ...state,
    leagues: action.leagues,
    status: EStateStatus.IDLE,
  })),
  on(LeagueActions.getLeaguesFailed, (state, action) => ({
    ...state,
    leagues: [],
    currentLeague: undefined,
    status: EStateStatus.ERROR,
    error: action.error,
  })),
  on(LeagueActions.setCurrentLeague, (state, action) => ({
    ...state,
    currentLeague: action.league,
  }))
);
