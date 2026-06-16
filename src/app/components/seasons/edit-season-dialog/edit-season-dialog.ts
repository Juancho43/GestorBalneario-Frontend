import {Component, computed, inject, signal} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {SeasonForm} from '../season-form/season-form';
import {MatDialogRef} from '@angular/material/dialog';
import {SeasonManager} from '../../../core/services/Managers/season-manager';
import {SeasonEntity} from '../../../core/model/SeasonEntity';

@Component({
  selector: 'app-edit-season-dialog',
  imports: [
    MatIcon,
    SeasonForm
  ],
  templateUrl: './edit-season-dialog.html',
  styleUrl: './edit-season-dialog.scss',
})
export class EditSeasonDialog {
  private ref = inject(MatDialogRef);
  private manager = inject(SeasonManager);
  protected season = computed(()=>this.manager.currentSeasonDetails()?.season)

  protected handleSubmit($event: SeasonEntity) {
    this.manager.updateSeason($event);
    this.close();
  }

  protected close() {
    this.ref.close();
  }
}
