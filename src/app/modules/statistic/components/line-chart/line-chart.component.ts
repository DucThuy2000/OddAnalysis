import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { EOdds, ETimelineMatch, IStatistic } from '@core/models';
import { ChartService } from '@core/services/chart.service';
Chart.register(...registerables);

enum InputField {
  ODD = 'types',
  STATS = 'stats',
  TIMELINE = 'timeline',
}

@Component({
  selector: 'c-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('chart', { static: false })
  chartRef!: ElementRef<HTMLCanvasElement>;
  @Input() stats!: IStatistic;
  @Input() types: EOdds = EOdds.GOALS;
  @Input() timeline: ETimelineMatch = ETimelineMatch.FULL_TIME;

  canvas: any;
  ctx: any;
  chart!: any;

  constructor(private chartService: ChartService) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Add firstChange condition to advoid the first time changes
    // Only accpect the default values in the first time
    if (changes[InputField.ODD] && !changes[InputField.ODD].firstChange)
      this.generateLineChart();

    if (changes[InputField.STATS] && !changes[InputField.STATS].firstChange)
      this.generateLineChart();

    if (
      changes[InputField.TIMELINE] &&
      !changes[InputField.TIMELINE].firstChange
    )
      this.generateLineChart();
  }

  ngAfterViewInit(): void {
    this.canvas = this.chartRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.generateLineChart();
  }

  refreshChart() {
    if (this.chart) this.chart.destroy();
  }

  getMatchStats() {
    return this.chartService.getLineChartDataset(
      this.types,
      this.stats,
      this.timeline
    );
  }

  createCornersChart(): void {
    const matchStats = this.getMatchStats();
    this.refreshChart();

    this.chart = this.chartService.getConnersChart(
      this.ctx,
      this.stats,
      matchStats
    );
  }

  createGoalsChart(): void {
    const matchStats = this.getMatchStats();
    this.refreshChart();

    this.chart = this.chartService.getGoalsChart(
      this.ctx,
      this.stats,
      matchStats
    );
  }

  createYellowCardsChart(): void {
    const matchStats = this.getMatchStats();
    this.refreshChart();

    this.chart = this.chartService.getYellowCardsChart(
      this.ctx,
      this.stats,
      matchStats
    );
  }

  createThrowInChart(): void {
    const matchStats = this.getMatchStats();
    this.refreshChart();

    this.chart = this.chartService.getThrowInChart(
      this.ctx,
      this.stats,
      matchStats
    );
  }

  createOffsideChart(): void {
    const matchStats = this.getMatchStats();
    this.refreshChart();

    this.chart = this.chartService.getOffsideChart(
      this.ctx,
      this.stats,
      matchStats
    );
  }

  createShotsOnTargetChart(): void {
    const matchStats = this.getMatchStats();
    this.refreshChart();

    this.chart = this.chartService.getShotOnTargetChart(
      this.ctx,
      this.stats,
      matchStats
    );
  }

  generateLineChart(): void {
    if (!this.stats) return;
    switch (this.types) {
      case EOdds.CORNERS:
        this.createCornersChart();
        break;
      case EOdds.YELLOW_CARDS:
        this.createYellowCardsChart();
        break;
      case EOdds.THROW_IN:
        this.createThrowInChart();
        break;
      case EOdds.OFF_SIDE:
        this.createOffsideChart();
        break;
      case EOdds.SHOTS_ON_TARGET:
        this.createShotsOnTargetChart();
        break;
      case EOdds.GOALS:
      default:
        this.createGoalsChart();
        break;
    }
  }
}
