import {Component, inject} from '@angular/core';
import {ShadowForm} from '../shawdow-form/shadow-form.component';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {MatDialogRef} from '@angular/material/dialog';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-new-shadow',
  imports: [
    ShadowForm,
    MatIcon
  ],
  templateUrl: './new-shadow.html',
  styleUrl: './new-shadow.scss',
})
export class NewShadow {
  private dialogRef = inject(MatDialogRef);
  protected submitHandler($event: ShadowEntity) {
    this.dialogRef.close($event);
  }
  protected close() {
    this.dialogRef.close();
  }
}

