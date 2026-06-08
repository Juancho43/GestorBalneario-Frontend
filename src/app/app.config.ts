import {ApplicationConfig, provideBrowserGlobalErrorListeners} from '@angular/core';
import {provideRouter, withComponentInputBinding, withViewTransitions} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {currentSeasonInterceptor} from './core/utils/interceptors/current-season-interceptor';
import {notificationInterceptor} from './core/utils/interceptors/notification-interceptor';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR' },
    provideNativeDateAdapter(),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([currentSeasonInterceptor,notificationInterceptor])),
    provideRouter(routes,withViewTransitions(),withComponentInputBinding()),
  ]
};
