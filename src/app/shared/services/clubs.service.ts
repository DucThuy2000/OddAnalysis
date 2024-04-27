import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../../environments/environment';
import { IClub } from '@shared/models';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClubsService {
  constructor(private http: HttpClient) {}

  getClubs(): Observable<IClub[]> {
    return this.http
      .get<IClub[]>(`${env.api}/teams`)
      .pipe(tap((data) => console.log(data, 'clubs')));
  }
}
