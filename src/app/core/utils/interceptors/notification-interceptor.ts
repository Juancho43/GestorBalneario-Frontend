import {HttpErrorResponse, HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {NotificationHelper} from '../../services/other/notification-helper';
import {inject} from '@angular/core';
import {catchError, tap, throwError} from 'rxjs';

export const notificationInterceptor: HttpInterceptorFn = (req, next) => {
  const notifier = inject(NotificationHelper);

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && req.method !== 'GET') {

        // 2. Access the body of the response
        const responseBody = event.body as any;

        // 3. Extract the message if it exists
        if (responseBody && responseBody.message) {
          notifier.notify(responseBody.message, false);
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = error.error?.message || `Error Code: ${error.status}`;
      }

      // Execute the notification with absolute clarity
      notifier.notify(errorMessage, true);

      return throwError(() => error);
    })
  );
};
