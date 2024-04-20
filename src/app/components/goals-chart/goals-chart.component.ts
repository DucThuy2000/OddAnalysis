import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { IStatisticFixtures } from 'models';
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
  @Input() data: IStatisticFixtures[] = [];
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

    const { opponents, goals } = this.data.reduce(
      (acc, fixture) => {
        acc.opponents.push(fixture.opponent);
        acc.goals.push(fixture.ga + fixture.gf);
        return acc;
      },
      {
        opponents: [] as string[],
        goals: [] as number[],
      }
    );

    new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: opponents,
        datasets: [
          {
            label: 'Total goals',
            data: goals,
            borderWidth: 1,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
            ],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
