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
    if (changes['odd'] && !changes['odd'].firstChange) {
      this.generateLineChart();
    }
  }

  ngAfterViewInit(): void {
    this.canvas = this.chartRef.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.generateLineChart();
  }

  createCornersChart(): void {
    const { opponents, totalCorners, personalCorner, opponentCorner } =
      this.chartService.getLineChartDataset(EOdds.CORNERS, this.stats);
    if (this.chart) this.chart.destroy();
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: opponents,
        datasets: [
          {
            label: 'Total Corners',
            data: totalCorners,
            borderColor: 'blue',
            borderWidth: 1.5,
            fill: false,
          },
          {
            label: `${this.stats.name}'s corners`,
            data: personalCorner,
            borderColor: 'green',
            borderWidth: 1.5,
            fill: false,
          },
          {
            label: `Opponent's corners`,
            data: opponentCorner,
            borderColor: 'red',
            borderWidth: 1.5,
            fill: false,
          },
        ],
      },
      options: {
        layout: {
          padding: {
            left: 20,
          },
        },
        scales: {
          y: {
            max: 20,
            min: 0,
            ticks: {
              stepSize: 2,
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: `${this.stats.name} last ${this.stats.totalMatch} mach EPL`,
            position: 'bottom', // Display title below the chart
          },
        },
      },
    });
  }

  createGoalsChart(): void {
    const { opponents, goalScored, goalConceded, totalGoals } =
      this.chartService.getLineChartDataset(EOdds.GOALS, this.stats);
    if (this.chart) this.chart.destroy();
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: opponents,
        datasets: [
          {
            label: 'Total Goals',
            data: totalGoals,
            borderColor: 'blue',
            borderWidth: 1.5,
            fill: false,
          },
          {
            label: 'Goals Scored',
            data: goalScored,
            borderColor: 'green',
            borderWidth: 1.5,
            fill: false,
          },
          {
            label: 'Goals Conceded',
            data: goalConceded,
            borderColor: 'red',
            borderWidth: 1.5,
            fill: false,
          },
        ],
      },
      options: {
        layout: {
          padding: {
            left: 20,
          },
        },
        scales: {
          y: {
            max: 8,
            min: 0,
            ticks: {
              stepSize: 1,
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: `${this.stats.name} last 5 mach EPL`,
            position: 'bottom', // Display title below the chart
          },
        },
      },
    });
  }

  generateLineChart(): void {
    if (!this.stats) return;
    switch (this.odd) {
      case EOdds.CORNERS:
        this.createCornersChart();
        break;
      case EOdds.CARDS:
        break;
      case EOdds.GOALS:
      default:
        this.createGoalsChart();
        break;
    }
  }
}
