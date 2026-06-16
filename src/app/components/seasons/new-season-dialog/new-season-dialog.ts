import {Component, inject} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {SeasonForm} from '../season-form/season-form';
import {MatIcon} from '@angular/material/icon';
import {SeasonEntity} from '../../../core/model/SeasonEntity';
import {SeasonManager} from '../../../core/services/Managers/season-manager';

@Component({
  selector: 'app-new-season-dialog',
  imports: [
    SeasonForm,
    MatIcon
  ],
  templateUrl: './new-season-dialog.html',
  styleUrl: './new-season-dialog.scss',
})
export class NewSeasonDialog {
  private ref = inject(MatDialogRef);
  private manager = inject(SeasonManager);

  protected handleSubmit($event: SeasonEntity) {
    this.manager.createSeason($event);
    this.close();
  }

  protected close(){
    this.ref.close();
  }
}
