import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { ODDS } from '@shared/constants';
import {
  IMatchDetail,
  IStatistic,
  IStatisticPayload,
  IStatisticReponse,
} from '@shared/models';
import { Subject, takeUntil } from 'rxjs';
import { StatisticService } from '@shared/services/statistic.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { StatisticDialogComponent } from '@shared/component/statistic-dialog/statistic-dialog.component';

@Component({
  selector: 'c-statistic',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    LineChartComponent,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css',
})
export class StatisticComponent implements OnChanges, OnDestroy, OnInit {
  private _destroyed$: Subject<void> = new Subject<void>();
  @Input() match!: IMatchDetail;

  statistic!: IStatisticReponse;
  oddSelection = ODDS;
  oddSelected = this.oddSelection[0].value;

  constructor(
    private statisticService: StatisticService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

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

  openStatisticDetailDialog(stat: IStatistic): void {
    if (!stat) return;
    this.dialog.open(StatisticDialogComponent, {
      data: stat,
      width: '600px',
    });
  }
}
