import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../environments/environment';
import {
  EResponseMessage,
  ICommonResponse,
  IStatisticPayload,
  IStatisticResponse,
} from '@core/models';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private http: HttpClient) {}

  getStatistic(payload: IStatisticPayload): Observable<IStatisticResponse> {
    const url = `${env.api}/statistic`;

    return this.http
      .get<ICommonResponse<IStatisticResponse>>(url, {
        params: {
          ...payload,
        },
      })
      .pipe(
        map((res) => (res.message === EResponseMessage.OK ? res.data : {}))
      );
  }
}
