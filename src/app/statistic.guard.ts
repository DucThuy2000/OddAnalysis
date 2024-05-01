import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PATH } from '@shared/constants/routes';

export const StatisticGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const queryParams = route.queryParams;
  if (!queryParams || !queryParams['home'] || !queryParams['away']) {
    // If query parameters are missing
    // --> redirect to the home page
    return router.createUrlTree([PATH.HOME]);
  }
  return true;
};
