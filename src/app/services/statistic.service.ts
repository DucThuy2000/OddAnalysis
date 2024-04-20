import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'environment/environment';
import {
  EResponseMessage,
  ICommonResponse,
  IStatisticPayload,
  IStatisticReponse,
} from 'models';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private http: HttpClient) {}

  getStatistic(payload: IStatisticPayload): Observable<IStatisticReponse> {
    const url = `${env.api}/statistic`;
    const params = { home: payload.homeId, away: payload.awayId };

    return this.http
      .get<ICommonResponse<IStatisticReponse>>(url, { params })
      .pipe(
        map((res) => (res.message === EResponseMessage.OK ? res.data : {}))
      );
  }
}
