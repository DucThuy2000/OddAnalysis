import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { NotFoundDataComponent } from '@shared/component/not-found-data/not-found-data.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { LeagueComponent } from './components/leagues/leagues.component';
import { MatchesComponent } from './components/matches/match.component';

@Component({
  selector: 'c-matches',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    NotFoundDataComponent,
    NzButtonModule,
    LeagueComponent,
    MatchesComponent,
  ],
  template: `<div class="grid grid-cols-1 md:grid-cols-12 gap-12">
    <div class="md:col-span-4 xl:col-span-3">
      <home-leagues />
    </div>
    <div class="md:col-span-8 xl:col-span-9">
      <home-matches />
    </div>
  </div>`,
})
export class HomeComponent {}
