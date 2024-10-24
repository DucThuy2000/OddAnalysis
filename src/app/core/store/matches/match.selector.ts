import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EFeatureKey } from '../app.state';
import { IMatchState } from './match.state';

const featureMatch = createFeatureSelector<IMatchState>(
  EFeatureKey.featureMatch
);

export const matchesSelector = createSelector(
  featureMatch,
  (state) => state.matches
);
export const matchesStatusSelector = createSelector(
  featureMatch,
  (state) => state.status
);
export const matchPaginationOptionSelector = createSelector(
  featureMatch,
  (state) => state.paginationOption
);
export const matchQueryParams = createSelector(
  featureMatch,
  (state) => state.queryParams
);
