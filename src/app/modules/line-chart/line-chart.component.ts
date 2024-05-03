import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { EOdds, IStatistic } from '@shared/models';
import { ChartService } from '@shared/services/chart.service';
Chart.register(...registerables);

enum InputField {
  ODD = 'odd',
  STATS = 'stats',
}

@Component({
  selector: 'c-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css',
})
export class LineChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('chart', { static: false })
  chartRef!: ElementRef<HTMLCanvasElement>;
  @Input() stats!: IStatistic;
  @Input() odd: EOdds = EOdds.GOALS;
  canvas: any;
  ctx: any;
  chart!: any;

  constructor(private chartService: ChartService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.stats, 'stats');
    // Add firstChange condition to advoid the first time changes
    // Only accpect the default values in the first time
    if (changes[InputField.ODD] && !changes[InputField.ODD].firstChange) {
      this.generateLineChart();
    }

    if (changes[InputField.STATS] && !changes[InputField.STATS].firstChange) {
      this.generateLineChart();
    }
  }

  ngAfterViewInit(): void {
    this.canvas = this.chartRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.generateLineChart();
  }

  refreshChart() {
    if (this.chart) this.chart.destroy();
  }

  createCornersChart(): void {
    const matchStats = this.chartService.getLineChartDataset(
      EOdds.CORNERS,
      this.stats
    );
    this.refreshChart();

    this.chart = this.chartService.getConnersChart(
      this.ctx,
      this.stats,
      matchStats
    );
  }

  createGoalsChart(): void {
    const matchStats = this.chartService.getLineChartDataset(
      EOdds.GOALS,
      this.stats
    );

    this.refreshChart();

    this.chart = this.chartService.getGoalsChart(
      this.ctx,
      this.stats,
      matchStats
    );
  }

  createYellowCardsChart(): void {
    const matchStats = this.chartService.getLineChartDataset(
      EOdds.YELLOW_CARDS,
      this.stats
    );

    this.refreshChart();

    this.chart = this.chartService.getYellowCardsChart(
      this.ctx,
      this.stats,
      matchStats
    );
  }

  createThrowInChart(): void {
    const matchStats = this.chartService.getLineChartDataset(
      EOdds.THROW_IN,
      this.stats
    );

    this.refreshChart();

    this.chart = this.chartService.getThrowInChart(
      this.ctx,
      this.stats,
      matchStats
    );
  }

  createOffsideChart(): void {
    const matchStats = this.chartService.getLineChartDataset(
      EOdds.OFF_SIDE,
      this.stats
    );

    this.refreshChart();

    this.chart = this.chartService.getOffsideChart(
      this.ctx,
      this.stats,
      matchStats
    );
  }

  generateLineChart(): void {
    if (!this.stats) return;
    switch (this.odd) {
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
      case EOdds.GOALS:
      default:
        this.createGoalsChart();
        break;
    }
  }
}
