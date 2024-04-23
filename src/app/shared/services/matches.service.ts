import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICommonResponse, IMatch, IMatchDetail } from '@shared/models';
import { Observable, map } from 'rxjs';
import { formatDate, formatTime } from '../helpers';
import { env } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class MatcheService {
  constructor(private httpClient: HttpClient) {}

  convertDate(match: IMatchDetail): IMatchDetail {
    const date = new Date(match.datetime);
    return {
      ...match,
      date: formatDate(date),
      time: formatTime(date),
    };
  }

  convertMatchData(matches: IMatchDetail[]): IMatch[] {
    if (!matches.length) return [];

    const convertedMatches = matches.map(this.convertDate);
    const uniqDates = Array.from(new Set(convertedMatches.map((m) => m.date)));

    return uniqDates.map((date) => ({
      date: date,
      data: convertedMatches.filter((m) => m.date === date),
    }));
  }

  getMatches(): Observable<IMatch[]> {
    return this.httpClient
      .get<ICommonResponse<IMatchDetail[]>>(`${env.api}/next-match`)
      .pipe(map((matches) => this.convertMatchData(matches.data)));
  }
}
