import {inject, Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class DialogHelper {
  private dialog = inject(MatDialog);
  openDialog(component: any, config?: any) {
     return this.dialog.open(component,config);
  }
  getConfig(): MatDialogConfig {
    return{
      width: '500px',
      autoFocus: false,
      restoreFocus: true,
      panelClass: 'custom-dark-dialog',
    };
  }
}
