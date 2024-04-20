import { Observable, map } from 'rxjs';
import { ILeague, ICommonResponse } from 'models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeagueService {
  constructor(private _http: HttpClient) {}

  getLeagues(): Observable<ILeague[]> {
    return this._http
      .get<ICommonResponse<ILeague[]>>('assets/league.json')
      .pipe(map((res) => res.data));
  }
}
