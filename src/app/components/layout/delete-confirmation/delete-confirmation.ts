import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {IDeleteDialogData} from '../../../core/Interfaces/DeleteDialogData';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-delete-confirmation',
  imports: [
    MatIcon
  ],
  templateUrl: './delete-confirmation.html',
  styleUrl: './delete-confirmation.scss',
})
export class DeleteConfirmation {
  private dialogRef = inject(MatDialogRef<DeleteConfirmation>)
  protected data : IDeleteDialogData = inject(MAT_DIALOG_DATA)
  protected onCancel(): void {
    this.dialogRef.close(false);
  }
  protected onConfirm(): void {
    this.dialogRef.close(true);
  }

  protected close (){
    this.dialogRef.close(false);
  };
}
