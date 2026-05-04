import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationHelper {
  private snackBar = inject(MatSnackBar);
  notify(message: string, isError: boolean = false) {
    this.snackBar.open(message, undefined, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      // We use panelClass to apply the "Success" or "Error" styling
      panelClass: isError ? ['toast-error'] : ['toast-success'],
    });
  }
}
