import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IStatistic, IStatisticFixtures } from 'models';
Chart.register(...registerables);

@Component({
  selector: 'c-goals-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './goals-chart.component.html',
  styleUrl: './goals-chart.component.css',
})
export class GoalsChartComponent implements AfterViewInit {
  @ViewChild('chart') chart: any;
  @Input() data!: IStatistic;
  canvas: any;
  ctx: any;
  constructor() {}

  ngAfterViewInit(): void {
    this.canvas = this.chart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    this.initGoalsChart();
  }

  initGoalsChart(): void {
    if (!this.data) return;
    console.log(this.data);
    const { opponents, goalScored, goalConceded } =
      this.data.previousFixtures.reduce(
        (acc, fixture) => {
          acc.opponents.push(fixture.opponent);
          acc.goalScored.push(fixture.gf);
          acc.goalConceded.push(fixture.ga);
          return acc;
        },
        {
          opponents: [] as string[],
          goalScored: [] as number[],
          goalConceded: [] as number[],
        }
      );

    new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: opponents,
        datasets: [
          {
            label: 'Goals Conceded',
            data: goalConceded,
            borderColor: 'red',
            borderWidth: 1.5,
            fill: false,
          },
          {
            label: 'Goals Scored',
            data: goalScored,
            borderColor: 'blue',
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
            text: `${this.data.name} last 5 mach EPL`,
            position: 'bottom', // Display title below the chart
          },
        },
      },
    });
  }
}
