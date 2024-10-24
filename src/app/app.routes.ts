import { Routes } from '@angular/router';
import { PATH } from '@core/constants';
import { StatisticGuard } from './statistic.guard';
import { StatisticComponent } from 'app/modules/statistic/statistic.component';
import { HomeComponent } from 'app/modules/home/home.component';
import { provideEffects } from '@ngrx/effects';
import { LeagueEffects } from '@core/store/leagues/league.effects';
import { MatchEffects } from '@core/store/matches/match.effects';

const routes: Routes = [
  {
    path: PATH.STATISTIC,
    component: StatisticComponent,
    canActivate: [StatisticGuard],
  },
  {
    path: PATH.HOME,
    component: HomeComponent,
    providers: [provideEffects(LeagueEffects, MatchEffects)],
  },
  {
    path: PATH.WILDCARD,
    component: HomeComponent,
    pathMatch: 'full',
  },
];

export default routes;
