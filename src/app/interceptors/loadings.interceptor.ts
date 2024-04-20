import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, map, tap } from 'rxjs';
import { LoadingService } from 'services/loading.service';

export const loadingsInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  return next(req).pipe(
    tap((_) => loadingService.show()),
    finalize(() => loadingService.hide())
  );
};
