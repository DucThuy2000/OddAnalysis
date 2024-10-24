import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  EResponseMessage,
  ICommonResponse,
  IMatch,
  IMatchDetail,
  IMatchRequest,
  IMatchResponse,
} from '@core/models';
import { Observable, map } from 'rxjs';
import { formatDate, formatTime } from '@core/helpers';
import { env } from 'environments/environment';
import { fromUnixTime } from 'date-fns';

@Injectable({ providedIn: 'root' })
export class MatchService {
  constructor(private httpClient: HttpClient) {}

  convertDate(match: IMatchDetail): IMatchDetail {
    const utcTime = fromUnixTime(match.startTime);
    const date = new Date(utcTime);
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

  getMatches(params: IMatchRequest): Observable<IMatchResponse> {
    return this.httpClient
      .get<ICommonResponse<IMatchResponse>>(`${env.api}/next-match`, {
        params: { ...params },
      })
      .pipe(map((response) => response.data));
  }
}
