import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { GoalsChartComponent } from 'components/goals-chart/goals-chart.component';
import { IMatchDetail, IStatisticPayload, IStatisticReponse } from 'models';
import { Subject, takeUntil } from 'rxjs';
import { StatisticService } from 'services/statistic.service';

@Component({
  selector: 'c-statistic',
  standalone: true,
  imports: [MatCardModule, CommonModule, GoalsChartComponent],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css',
})
export class StatisticComponent implements OnChanges, OnDestroy {
  private _destroyed$: Subject<void> = new Subject<void>();
  @Input() match!: IMatchDetail;

  statistic!: IStatisticReponse;
  constructor(private statisticService: StatisticService) {}

  ngOnChanges(): void {
    if (this.match) this.getStatistic();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  getStatistic(): void {
    const payload: IStatisticPayload = {
      homeId: this.match.home.id,
      awayId: this.match.away.id,
    };
    this.statisticService
      .getStatistic(payload)
      .pipe(takeUntil(this._destroyed$))
      .subscribe((res) => (this.statistic = res));
  }
}
