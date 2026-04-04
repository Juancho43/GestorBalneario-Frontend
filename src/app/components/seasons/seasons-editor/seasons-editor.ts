import {Component, inject, signal} from '@angular/core';
import {SeasonForm} from '../season-form/season-form';
import {CreateSeasonHttp} from '../../../core/services/SeasonHttp/create-season-http';
import {SeasonEntity} from '../../../core/model/SeasonEntity';
import {MatCheckbox} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {SeasonManager} from '../../../core/services/Managers/season-manager';

@Component({
  selector: 'app-seasons-editor',
  imports: [
    SeasonForm,
    MatCheckbox,
    FormsModule
  ],
  templateUrl: './seasons-editor.html',
  styleUrl: './seasons-editor.scss',
})
export class SeasonsEditor {
  private createHttp = inject(CreateSeasonHttp);
  private seasonManager = inject(SeasonManager);
  cloneSeason = false;
  currentSeason = this.seasonManager.currentSeason;
  protected create($event: SeasonEntity) {
    if (this.cloneSeason) {
     this.createHttp.clone({newSeason:$event,oldSeasonId:this.currentSeason().id!}).subscribe();
    }else{
      this.createHttp.execute($event).subscribe();
    }
  }
}
