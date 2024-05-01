import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../environments/environment';
import {
  EResponseMessage,
  ICommonResponse,
  IStatisticPayload,
  IStatisticReponse,
} from '@shared/models';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatisticService {
  constructor(private http: HttpClient) {}

  getStatistic(payload: IStatisticPayload): Observable<IStatisticReponse> {
    const url = `${env.api}/statistic`;

    return this.http
      .get<ICommonResponse<IStatisticReponse>>(url, {
        params: {
          ...payload,
        },
      })
      .pipe(
        map((res) => (res.message === EResponseMessage.OK ? res.data : {}))
      );
  }
}
