import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PATH } from '@shared/constants/routes';
import { EStatisticQueryParams } from '@shared/models';

export const StatisticGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const queryParams = route.queryParams;
  if (
    !queryParams ||
    !queryParams[EStatisticQueryParams.LEAGUE] ||
    !queryParams[EStatisticQueryParams.HOME] ||
    !queryParams[EStatisticQueryParams.AWAY]
  ) {
    // If query parameters are missing
    // --> redirect to the home page
    return router.createUrlTree([PATH.HOME]);
  }
  return true;
};
