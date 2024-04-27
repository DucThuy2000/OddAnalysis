export interface IClub {
  id: number;
  name: string;
  logo: string;
}

export interface IStatisticPayload {
  homeId: number;
  awayId: number;
  size: number;
}

export interface IStatisticFixtures {
  opponent: string;
  timestamp: number;
  gf: number;
  ga: number;
  c: number;
  ca: number;
  corner: number;
  cornerA: number;
}

export interface IStatistic {
  name: string;
  previousFixtures: IStatisticFixtures[];
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
