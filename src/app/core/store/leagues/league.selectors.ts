import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ILeagueState } from './league.state';
import { EFeatureKey } from '../app.state';

const featureLeague = createFeatureSelector<ILeagueState>(
  EFeatureKey.featureLeague
);

export const leaguesSelector = createSelector(
  featureLeague,
  (state) => state.leagues
);
export const leagueStatusSelector = createSelector(
  featureLeague,
  (state) => state.status
);
export const currentLeagueSelector = createSelector(
  featureLeague,
  (state) => state.currentLeague
);
