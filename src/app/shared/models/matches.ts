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
  opponents: any;
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
  shotOnGoal?: number[];
  shotOnGoalA?: number[];
  totalShots?: number[];
}
