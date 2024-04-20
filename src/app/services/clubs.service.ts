import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'environment/environment';
import { IClub } from 'models';
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
