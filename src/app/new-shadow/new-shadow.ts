import {Component, inject} from '@angular/core';
import {ShadowForm} from '../components/shadows/shawdow-form/shadow-form.component';
import {ShadowEntity} from '../core/model/shadowEntity';
import {ShadowListManager} from '../core/services/Managers/shadow-list-manager';
import {MatDialogRef} from '@angular/material/dialog';
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

