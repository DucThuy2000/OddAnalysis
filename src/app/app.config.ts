import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { headersInterceptor } from './interceptors/headers.interceptor';
import { loadingsInterceptor } from './interceptors/loadings.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([loadingsInterceptor])),
  ],
};
