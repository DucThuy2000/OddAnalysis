import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICommonResponse, IMatch, IMatchDetail } from '@shared/models';
import { Observable, map } from 'rxjs';
import { formatDate, formatTime } from '../helpers';
import { env } from 'environments/environment';
import { fromUnixTime } from 'date-fns';

@Injectable({ providedIn: 'root' })
export class MatcheService {
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
    console.log(convertedMatches, 'mathces');
    const uniqDates = Array.from(new Set(convertedMatches.map((m) => m.date)));

    return uniqDates.map((date) => ({
      date: date,
      data: convertedMatches.filter((m) => m.date === date),
    }));
  }

  getMatches(leagueId: string): Observable<IMatch[]> {
    return this.httpClient
      .get<ICommonResponse<IMatchDetail[]>>(`${env.api}/next-match`, {
        params: { leagueId },
      })
      .pipe(map((matches) => this.convertMatchData(matches.data)));
  }
}
