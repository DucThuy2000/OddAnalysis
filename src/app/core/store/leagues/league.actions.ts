import { createAction, props } from '@ngrx/store';
import { ELeagueAction } from './league.state';
import { ILeague } from '@core/models';

const getLeagues = createAction(ELeagueAction.GET);
const getLeaguesSuccess = createAction(
  ELeagueAction.GET_SUCCESS,
  props<{ leagues: ILeague[] }>()
);
const getLeaguesFailed = createAction(
  ELeagueAction.GET_FAILED,
  props<{ error?: string }>()
);
const setCurrentLeague = createAction(
  ELeagueAction.SET_CURRENT_LEAGUE,
  props<{ league: ILeague }>()
);

export const LeagueActions = {
  getLeagues,
  getLeaguesSuccess,
  getLeaguesFailed,
  setCurrentLeague,
};
