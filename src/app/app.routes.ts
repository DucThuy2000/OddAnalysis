import { Routes } from '@angular/router';
import { PATH } from '@shared/constants/routes';
import { MatchesComponent } from 'app/modules/matches/matches.component';
import { StatisticComponent } from 'app/modules/statistic/statistic.component';
import { StatisticGuard } from './statistic.guard';

const routes: Routes = [
  {
    path: PATH.STATISTIC,
    component: StatisticComponent,
    canActivate: [StatisticGuard],
  },
  { path: PATH.WILDCARD, component: MatchesComponent, pathMatch: 'full' },
];

export default routes;
