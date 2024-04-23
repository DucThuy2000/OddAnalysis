import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loading$ = new Subject<boolean>();

  constructor() {}

  getSpinnerObserver(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  show() {
    this.loading$.next(true);
  }

  hide() {
    this.loading$.next(false);
  }
}
