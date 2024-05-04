export const PATH = {
  WILDCARD: '**',
  HOME: '',
  STATISTIC: 'statistic',
};

export const ROUTE_LINK = {
  HOME: '/',
  STATISTIC: '/statistic',
};

export interface STATISTIC_QUERY_PARAMS {
  home: number;
  away: number;
  league?: string;
}
