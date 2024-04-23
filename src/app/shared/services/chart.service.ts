import { Injectable } from '@angular/core';
import { EOdds, IMatchStat, IStatistic } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class ChartService {
  getLineChartDataset = (odds: EOdds, stats: IStatistic): IMatchStat => {
    const { previousFixtures } = stats;
    const result: IMatchStat = this.initializeResult();

    for (const fixture of previousFixtures) {
      const { opponent, corner, cornerA, ga, gf } = fixture;
      result.opponents.push(opponent);

      switch (odds) {
        case EOdds.CONNERS:
          this.updateConnorsResult(result, cornerA, corner);
          break;
        case EOdds.CARDS:
          // handle cards case if needed
          break;
        case EOdds.GOALS:
        default:
          this.updateGoalsResult(result, ga, gf);
          break;
      }
    }

    return result;
  };

  initializeResult = (): IMatchStat => {
    return {
      opponents: [],
      opponentCorner: [],
      personalCorner: [],
      totalConners: [],
      goalConceded: [],
      goalScored: [],
      totalGoals: [],
    };
  };

  updateConnorsResult = (
    result: IMatchStat,
    cornerA: number,
    corner: number
  ) => {
    result.opponentCorner?.push(cornerA);
    result.personalCorner?.push(corner);
    result.totalConners?.push(corner + cornerA);
  };

  updateGoalsResult = (result: IMatchStat, ga: number, gf: number) => {
    result.goalConceded?.push(ga);
    result.goalScored?.push(gf);
    result.totalGoals?.push(ga + gf);
  };
}
