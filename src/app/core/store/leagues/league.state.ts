import { ILeague } from '@core/models';
import { EStateStatus } from '../app.state';

export enum ELeagueAction {
  GET = '[Leagues] Get Leagues',
  GET_SUCCESS = '[Leagues] Get Leagues Success',
  GET_FAILED = '[Leagues] Get Leagues Failed',
  SET_CURRENT_LEAGUE = '[Leagues] Set Current League',
  SELECT = '[Leagues] Select Leagues',
}

export interface ILeagueState {
  leagues: ILeague[];
  currentLeague: ILeague | undefined;
  status: EStateStatus;
  error?: string;
}
