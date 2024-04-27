import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EResponseMessage, ICommonResponse, ILeague } from '@shared/models';
import { env } from 'environments/environment';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LeagueService {
  constructor(private http: HttpClient) {}

  getLeagues(): Observable<ILeague[]> {
    return this.http.get<ICommonResponse<ILeague[]>>(`${env.api}/leagues`).pipe(
      map((res) => {
        if (res.message === EResponseMessage.OK) return res.data;
        return [];
      })
    );
  }
}
