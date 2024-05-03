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

export interface IMatchChartStat {
  opponents: string[];
  goalScored?: number[];
  goalConceded?: number[];
  opponentCorner?: number[];
  personalCorner?: number[];
  totalGoals?: number[];
  totalCorners?: number[];
  yellowCard?: number[];
  yellowCardA?: number[];
  totalYellowCard?: number[];
  throwIn?: number[];
  throwInA?: number[];
  totalThrowIn?: number[];
  offside?: number[];
  offsideA?: number[];
  totalOffside?: number[];
}

export enum EOdds {
  GOALS = 'Goals',
  CORNERS = 'Corners',
  YELLOW_CARDS = 'Yello cards',
  THROW_IN = 'Throw in',
  OFF_SIDE = 'Off side',
}
