import {Component, inject} from '@angular/core';
import {ShadowForm} from '../shawdow-form/shadow-form.component';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {DialogRef} from '@angular/cdk/dialog';

@Component({
  selector: 'app-new-shadow',
  imports: [
    ShadowForm
  ],
  templateUrl: './new-shadow.html',
  styleUrl: './new-shadow.scss',
})
export class NewShadow {
  private dialogRef = inject(DialogRef);
  protected checkIdentifier($event: ShadowEntity) {
      this.dialogRef.close($event);
    }
}

