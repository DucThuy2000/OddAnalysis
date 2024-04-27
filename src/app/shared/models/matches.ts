import { IClub } from './clubs';

export interface IMatch {
  data: IMatchDetail[];
  date: string;
}

export interface IMatchDetail {
  home: IClub;
  away: IClub;
  startTime: number;
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
  totalCorners?: number[];
}

export enum EOdds {
  GOALS = 'Goals',
  CORNERS = 'Corners',
  CARDS = 'Cards',
}
