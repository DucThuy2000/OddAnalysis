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
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { StatisticService } from '@shared/services/statistic.service';
import {
  FormBuilder,
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
import { MatRadioModule } from '@angular/material/radio';
import { StatisticDialogComponent } from '@shared/component/statistic-dialog/statistic-dialog.component';
import _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { STATISTIC_QUERY_PARAMS } from '@shared/constants/routes';
import { ErrorMessage } from '@shared/component/error-message/error-message.component';
import { InputNumber } from '@shared/component/form/input-number/input-number.component';

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
    MatRadioModule,
    ErrorMessage,
    InputNumber,
  ],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css',
})
export class StatisticComponent implements OnDestroy, OnInit {
  private _destroyed$: Subject<void> = new Subject<void>();

  // Router query params
  queryParams!: STATISTIC_QUERY_PARAMS;
  form!: FormGroup;
  statistic!: IStatisticReponse;
  oddSelection = ODDS;

  constructor(
    private statisticService: StatisticService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchQueryParams();
    this.initForm();
    this.getStatistic();
    this.watchNumberRecentMatchesChanges();
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

  fetchQueryParams(): void {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.queryParams = {
          home: Number(params['home']),
          away: Number(params['away']),
        };
      }
    });
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

  getStatistic(): void {
    const payload: IStatisticPayload = {
      home: this.queryParams.home,
      away: this.queryParams.away,
      size: this.recentMatchFormControl?.value || DEFAULT_MATHCES,
    };

    this.statisticService
      .getStatistic(payload)
      .pipe(takeUntil(this._destroyed$))
      .subscribe((stats) => (this.statistic = stats));
  }

  watchNumberRecentMatchesChanges(): void {
    if (!this.recentMatchFormControl) return;
    this.recentMatchFormControl.valueChanges
      .pipe(takeUntil(this._destroyed$), debounceTime(500))
      .subscribe((value) => {
        if (this.recentMatchFormControl?.errors) return;
        // Call statistic API for new valid recent matches input value
        this.getStatistic();
      });
  }

  openStatisticDetailDialog(stat: IStatistic): void {
    if (!stat) return;
    this.dialog.open(StatisticDialogComponent, {
      data: stat,
      width: '600px',
    });
  }
}
