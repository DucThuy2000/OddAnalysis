import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { ODDS } from '@shared/constants';
import {
  EOdds,
  IMatchDetail,
  IStatistic,
  IStatisticPayload,
  IStatisticReponse,
} from '@shared/models';
import { Subject, takeUntil } from 'rxjs';
import { StatisticService } from '@shared/services/statistic.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { StatisticDialogComponent } from '@shared/component/statistic-dialog/statistic-dialog.component';

const DEFAULT_MATHCES = 5;

enum FORM_FIELD {
  ODD = 'odd',
  RECENT_MATCHES = 'recentMatches',
}

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
    ReactiveFormsModule,
  ],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css',
})
export class StatisticComponent implements OnChanges, OnDestroy, OnInit {
  private _destroyed$: Subject<void> = new Subject<void>();
  @Input() match!: IMatchDetail;
  @Input() tabIndex: number = 0;

  form!: FormGroup;
  statistic!: IStatisticReponse;
  oddSelection = ODDS;

  constructor(
    private statisticService: StatisticService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(): void {
    if (this.match) this.getStatistic();
    if (!this.tabIndex) this.resetForm();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  get oddSelected() {
    if (!this.form.get([FORM_FIELD.ODD])) return '';
    return this.form.get([FORM_FIELD.ODD])?.value;
  }

  get recentMatchFormControl() {
    if (!this.form) return;
    return this.form.get(FORM_FIELD.RECENT_MATCHES);
  }

  resetForm(): void {
    if (!this.form) return;
    this.form.reset({
      [FORM_FIELD.ODD]: this.oddSelection[0].value,
      [FORM_FIELD.RECENT_MATCHES]: DEFAULT_MATHCES,
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      [FORM_FIELD.ODD]: [this.oddSelection[0].value],
      [FORM_FIELD.RECENT_MATCHES]: [
        DEFAULT_MATHCES,
        [Validators.max(10), Validators.min(2)],
      ],
    });
  }

  onRecentMatchesChange(): void {
    console.log(this.form.get);
  }

  getStatistic(): void {
    const payload: IStatisticPayload = {
      homeId: this.match.home.id,
      awayId: this.match.away.id,
      size: this.recentMatchFormControl?.value || DEFAULT_MATHCES,
    };

    this.statisticService
      .getStatistic(payload)
      .pipe(takeUntil(this._destroyed$))
      .subscribe((res) => (this.statistic = res));
  }

  onBlurRecentMatches(): void {
    if (!this.recentMatchFormControl?.errors) this.getStatistic();
  }

  openStatisticDetailDialog(stat: IStatistic): void {
    if (!stat) return;
    this.dialog.open(StatisticDialogComponent, {
      data: stat,
      width: '600px',
    });
  }
}
