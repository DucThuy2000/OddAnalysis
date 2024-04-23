import { LoadingService } from '@shared/services/loading.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ClubsService } from '@shared/services/clubs.service';
import { Subject } from 'rxjs';
import { IMatchDetail } from '@shared/models';
import { MatTabsModule } from '@angular/material/tabs';
import { MatchesComponent } from './modules/matches/matches.component';
import { StatisticComponent } from './modules/statistic/statistic.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatchesComponent,
    StatisticComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject<void>();
  loader: boolean = false;
  oddSelection = [
    { value: 'conners', label: 'Conners' },
    { value: 'goals', label: 'Goals' },
  ];
  selectedClub: string = '';
  matchSelected!: IMatchDetail;
  tabIndex: number = 0;
  constructor(
    private clubService: ClubsService,
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadingService.getSpinnerObserver().subscribe((loading) => {
      this.loader = loading;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  onClickMatch(match: IMatchDetail): void {
    this.matchSelected = match;
    this.tabIndex += 1;
  }
}
