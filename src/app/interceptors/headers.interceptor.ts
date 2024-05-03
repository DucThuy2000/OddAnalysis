import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedHeaders = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
      accept: '*/*',
      Connection: 'keep-alive',
    },
  });
  return next(modifiedHeaders);
};
