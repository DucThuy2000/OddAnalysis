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
