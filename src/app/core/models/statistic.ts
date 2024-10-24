import { IClub } from './clubs';

export interface IStatisticPayload {
  home: number;
  away: number;
  size: number;
}

export interface IStatisticDetails {
  shotOnGoal: number;
  shotOnGoalA: number;
  offside: number;
  offsideA: number;
  yellowCard: number;
  yellowCardA: number;
  throwIn: number;
  throwInA: number;
  gf: number;
  ga: number;
  corner: number;
  cornerA: number;
}

export interface IStatisticFixtures {
  matchId: string;
  fullTime: IStatisticDetails;
  firstHalf: IStatisticDetails;
  secondHalf: IStatisticDetails;
  opponent: IClub;
}

export interface IStatistic {
  name: string;
  logo: string;
  previousStatistic: IStatisticFixtures[];
  avgCorner?: number;
  avgCornerA?: number;
  avgCornerTotal?: number;
  avgGoals?: number;
  avgGoalsA?: number;
  avgGoalsTotal?: number;
  avgYellowCard?: number;
  avgYellowCardA?: number;
  avgYellowCardTotal?: number;
  totalMatch?: number;
}

export interface IStatisticReponse {
  home?: IStatistic;
  away?: IStatistic;
}

export enum EStatisticQueryParams {
  LEAGUE = 'league',
  HOME = 'home',
  AWAY = 'away',
}

export enum EOdds {
  GOALS = 'Goals',
  CORNERS = 'Corners',
  YELLOW_CARDS = 'Yello cards',
  THROW_IN = 'Throw in',
  OFF_SIDE = 'Offside',
  SHOTS_ON_TARGET = 'Shots on target',
}

export enum ETimelineMatch {
  FULL_TIME = 'fullTime',
  FIRST_HALF = 'firstHalf',
  SECOND_HALF = 'secondHalf',
}
