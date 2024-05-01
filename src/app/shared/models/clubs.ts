export interface IClub {
  id: number;
  name: string;
  logo: string;
  codeName: string;
}

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
