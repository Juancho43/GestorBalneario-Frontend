import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';
import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {currentSeasonInterceptor} from './core/utils/interceptors/current-season-interceptor';
import {notificationInterceptor} from './core/utils/interceptors/notification-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([currentSeasonInterceptor,notificationInterceptor])),
    provideRouter(routes,withViewTransitions()),
  ]
};
