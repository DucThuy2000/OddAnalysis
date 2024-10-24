import { ICommonPaginationResponse, IMatch, IMatchRequest } from '@core/models';
import { EStateStatus } from '../app.state';

export enum EMatchActions {
  GET = '[Matches] Get Matches',
  GET_SUCCESS = '[Matches] Get Matches Success',
  GET_FAILED = '[Matches] Get Matches Failed',
  RESET = '[Matches] Reset Match data',
}

export interface IMatchState {
  paginationOption: Partial<ICommonPaginationResponse>;
  queryParams: IMatchRequest;
  matches: IMatch[];
  status: EStateStatus;
  error?: string;
}
