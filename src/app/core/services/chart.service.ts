import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  EOdds,
  EStatisticQueryParams,
  ETimelineMatch,
  IMatchChartStat,
  IStatistic,
} from '@core/models';
import { Chart } from 'chart.js';
import _ from 'lodash';

@Injectable({ providedIn: 'root' })
export class ChartService {
  private leagueName: string = '';

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params[EStatisticQueryParams.LEAGUE])
        this.transformLeagueName(params[EStatisticQueryParams.LEAGUE]);
    });
  }

  transformLeagueName(name: string): void {
    const capitialized = name.charAt(0).toUpperCase();
    const sliced = name.slice(1);

    this.leagueName = capitialized + sliced;
  }

  getLineChartDataset = (
    odds: EOdds,
    stats: IStatistic,
    timeline: ETimelineMatch
  ): IMatchChartStat => {
    const { previousStatistic } = stats;
    const matchReversed = _.cloneDeep(previousStatistic).reverse();
    const result: IMatchChartStat = this.initializeResult();

    for (const fixture of matchReversed) {
      const {
        corner,
        cornerA,
        ga,
        gf,
        throwIn,
        throwInA,
        yellowCard,
        yellowCardA,
        offside,
        offsideA,
        shotOnGoal,
        shotOnGoalA,
      } = fixture[timeline];
      const nameSplited = fixture.opponent.name.split(' ');
      result.opponents.push(nameSplited);

      switch (odds) {
        case EOdds.CORNERS:
          this.updateConnorsResult(result, cornerA, corner);
          break;
        case EOdds.YELLOW_CARDS:
          this.updateYellowCardsResult(result, yellowCardA, yellowCard);
          break;
        case EOdds.THROW_IN:
          this.updateThrowInResult(result, throwInA, throwIn);
          break;
        case EOdds.OFF_SIDE:
          this.updateOffSideResult(result, offsideA, offside);
          break;
        case EOdds.SHOTS_ON_TARGET:
          this.updateShotsOnTargetResult(result, shotOnGoalA, shotOnGoal);
          break;
        case EOdds.GOALS:
        default:
          this.updateGoalsResult(result, ga, gf);
          break;
      }
    }
    return result;
  };

  initializeResult = (): IMatchChartStat => {
    return {
      opponents: [],
      opponentCorner: [],
      personalCorner: [],
      totalCorners: [],
      goalConceded: [],
      goalScored: [],
      totalGoals: [],
      yellowCard: [],
      yellowCardA: [],
      totalYellowCard: [],
      throwIn: [],
      throwInA: [],
      totalThrowIn: [],
      offside: [],
      offsideA: [],
      totalOffside: [],
      shotOnGoal: [],
      shotOnGoalA: [],
      totalShots: [],
    };
  };

  updateConnorsResult = (
    result: IMatchChartStat,
    cornerA: number,
    corner: number
  ) => {
    result.opponentCorner?.push(cornerA);
    result.personalCorner?.push(corner);
    result.totalCorners?.push(corner + cornerA);
  };

  updateGoalsResult = (result: IMatchChartStat, ga: number, gf: number) => {
    result.goalConceded?.push(ga);
    result.goalScored?.push(gf);
    result.totalGoals?.push(ga + gf);
  };

  updateYellowCardsResult = (
    result: IMatchChartStat,
    yellowCardA: number,
    yellowCard: number
  ) => {
    result.yellowCardA?.push(yellowCardA);
    result.yellowCard?.push(yellowCard);
    result.totalYellowCard?.push(yellowCard + yellowCardA);
  };

  updateThrowInResult = (
    result: IMatchChartStat,
    throwInA: number,
    throwIn: number
  ) => {
    result.throwInA?.push(throwInA);
    result.throwIn?.push(throwIn);
    result.totalThrowIn?.push(throwInA + throwIn);
  };

  updateOffSideResult = (
    result: IMatchChartStat,
    offsideA: number,
    offside: number
  ) => {
    result.offsideA?.push(offsideA);
    result.offside?.push(offside);
    result.totalOffside?.push(offsideA + offside);
  };

  updateShotsOnTargetResult = (
    result: IMatchChartStat,
    shotOnGoalA: number,
    shotOnGoal: number
  ) => {
    result.shotOnGoalA?.push(shotOnGoalA);
    result.shotOnGoal?.push(shotOnGoal);
    result.totalShots?.push(shotOnGoalA + shotOnGoal);
  };

  getMaxYForLineChart(total: number) {
    return total % 2 === 0 ? total + 2 : total + 3;
  }

  getConfigLineChart(
    stats: IStatistic,
    datasets: any,
    labels: string[],
    maxY: number
  ): any {
    return {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        layout: {
          padding: {
            left: 20,
          },
        },
        scales: {
          y: {
            max: maxY,
            min: 0,
            ticks: {
              stepSize: maxY > 10 ? 2 : 1,
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: `${stats.name} last 5 matches in ${this.leagueName}`,
            position: 'bottom',
          },
        },
      },
    };
  }

  getGoalsChart(ctx: any, stats: IStatistic, matchStats: IMatchChartStat) {
    const { opponents } = matchStats;
    const maxY = this.getMaxYForLineChart(Math.max(...matchStats.totalGoals!));
    const datasets = [
      {
        label: 'Total goals',
        data: matchStats.totalGoals,
        borderColor: 'blue',
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Goals scored',
        data: matchStats.goalScored,
        borderColor: 'green',
        borderWidth: 1,
        fill: false,
      },
      {
        label: 'Goals conceded',
        data: matchStats.goalConceded,
        borderColor: 'red',
        borderWidth: 1,
        fill: false,
      },
    ];
    const chartConfig = this.getConfigLineChart(
      stats,
      datasets,
      opponents,
      maxY
    );
    return new Chart(ctx, chartConfig);
  }

  getConnersChart(ctx: any, stats: IStatistic, matchStats: IMatchChartStat) {
    const { opponents } = matchStats;
    const maxY = this.getMaxYForLineChart(
      Math.max(...matchStats.totalCorners!)
    );
    const datasets = [
      {
        label: 'Total corners',
        data: matchStats.totalCorners,
        borderColor: 'blue',
        borderWidth: 2,
        fill: false,
      },
      {
        label: `${stats.name}'s corners`,
        data: matchStats.personalCorner,
        borderColor: 'green',
        borderWidth: 1,
        fill: false,
      },
      {
        label: `Opponent's corners`,
        data: matchStats.opponentCorner,
        borderColor: 'red',
        borderWidth: 1,
        fill: false,
      },
    ];
    const chartConfig = this.getConfigLineChart(
      stats,
      datasets,
      opponents,
      maxY
    );
    return new Chart(ctx, chartConfig);
  }

  getYellowCardsChart(
    ctx: any,
    stats: IStatistic,
    matchStats: IMatchChartStat
  ) {
    const { opponents } = matchStats;
    const maxY = this.getMaxYForLineChart(
      Math.max(...matchStats.totalYellowCard!)
    );
    const datasets = [
      {
        label: 'Total yellow cards',
        data: matchStats.totalYellowCard,
        borderColor: 'blue',
        borderWidth: 2,
        fill: false,
      },
      {
        label: `${stats.name}'s yellow cards`,
        data: matchStats.yellowCard,
        borderColor: 'green',
        borderWidth: 1,
        fill: false,
      },
      {
        label: `Opponent's yellow cards`,
        data: matchStats.yellowCardA,
        borderColor: 'red',
        borderWidth: 1,
        fill: false,
      },
    ];
    const chartConfig = this.getConfigLineChart(
      stats,
      datasets,
      opponents,
      maxY
    );
    return new Chart(ctx, chartConfig);
  }

  getThrowInChart(ctx: any, stats: IStatistic, matchStats: IMatchChartStat) {
    const { opponents } = matchStats;
    const maxY = this.getMaxYForLineChart(
      Math.max(...matchStats.totalThrowIn!)
    );
    const datasets = [
      {
        label: 'Total throw in',
        data: matchStats.totalThrowIn,
        borderColor: 'blue',
        borderWidth: 2,
        fill: false,
      },
      {
        label: `${stats.name}'s throw in`,
        data: matchStats.throwIn,
        borderColor: 'green',
        borderWidth: 1,
        fill: false,
      },
      {
        label: `Opponent's throw in`,
        data: matchStats.throwInA,
        borderColor: 'red',
        borderWidth: 1,
        fill: false,
      },
    ];
    const chartConfig = this.getConfigLineChart(
      stats,
      datasets,
      opponents,
      maxY
    );
    return new Chart(ctx, chartConfig);
  }

  getOffsideChart(ctx: any, stats: IStatistic, matchStats: IMatchChartStat) {
    const { opponents } = matchStats;
    const maxY = this.getMaxYForLineChart(
      Math.max(...matchStats.totalOffside!)
    );
    const datasets = [
      {
        label: 'Total offside',
        data: matchStats.totalOffside,
        borderColor: 'blue',
        borderWidth: 2,
        fill: false,
      },
      {
        label: `${stats.name}'s offside`,
        data: matchStats.offside,
        borderColor: 'green',
        borderWidth: 1,
        fill: false,
      },
      {
        label: `Opponent's offside`,
        data: matchStats.offsideA,
        borderColor: 'red',
        borderWidth: 1,
        fill: false,
      },
    ];
    const chartConfig = this.getConfigLineChart(
      stats,
      datasets,
      opponents,
      maxY
    );
    return new Chart(ctx, chartConfig);
  }

  getShotOnTargetChart(
    ctx: any,
    stats: IStatistic,
    matchStats: IMatchChartStat
  ) {
    const { opponents } = matchStats;
    const maxY = this.getMaxYForLineChart(Math.max(...matchStats.totalShots!));
    const datasets = [
      {
        label: 'Total shots on target',
        data: matchStats.totalShots,
        borderColor: 'blue',
        borderWidth: 2,
        fill: false,
      },
      {
        label: `${stats.name}'s shots on target`,
        data: matchStats.shotOnGoal,
        borderColor: 'green',
        borderWidth: 1,
        fill: false,
      },
      {
        label: `Opponent's shots on target`,
        data: matchStats.shotOnGoalA,
        borderColor: 'red',
        borderWidth: 1,
        fill: false,
      },
    ];
    const chartConfig = this.getConfigLineChart(
      stats,
      datasets,
      opponents,
      maxY
    );
    return new Chart(ctx, chartConfig);
  }
}
