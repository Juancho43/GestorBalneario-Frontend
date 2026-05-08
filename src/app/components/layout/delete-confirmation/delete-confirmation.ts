import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {JsonPipe} from '@angular/common';
import {IDeleteDialogData} from '../../../core/DTO/DeleteDialogData';

@Component({
  selector: 'app-delete-confirmation',
  imports: [
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './delete-confirmation.html',
  styleUrl: './delete-confirmation.scss',
})
export class DeleteConfirmation {
  protected data : IDeleteDialogData = inject(MAT_DIALOG_DATA)
  private dialogRef = inject(MatDialogRef<DeleteConfirmation>)
  onCancel(): void {
    this.dialogRef.close(false);
  }
  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
