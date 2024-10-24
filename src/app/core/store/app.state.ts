import { ILeagueState } from './leagues/league.state';
import { IMatchState } from './matches/match.state';

export enum EStateStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  ERROR = 'error',
}

export enum EFeatureKey {
  featureLeague = 'feature_league',
  featureMatch = 'feature_match',
}

export interface IAppState {
  feature_league: ILeagueState;
  feature_match: IMatchState;
}
