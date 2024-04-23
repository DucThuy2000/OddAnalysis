import { IClub } from './clubs';

export interface IMatch {
  data: IMatchDetail[];
  date: string;
}

export interface IMatchDetail {
  home: IClub;
  away: IClub;
  datetime: string;
  date: string;
  time: string;
}

export interface IMatchStat {
  opponents: string[];
  goalScored?: number[];
  goalConceded?: number[];
  opponentCorner?: number[];
  personalCorner?: number[];
  totalGoals?: number[];
  totalConners?: number[];
}

export enum EOdds {
  GOALS = 'Goals',
  CONNERS = 'Conners',
  CARDS = 'Cards',
}
