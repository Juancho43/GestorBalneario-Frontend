import {Component, inject} from '@angular/core';
import {DatePipe, JsonPipe} from '@angular/common';
import {SeasonEntity} from '../../../core/model/SeasonEntity';
import {SeasonManager} from '../../../core/services/Managers/season-manager';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {OverlayHelper} from '../../../core/utils/overlay-helper';

@Component({
  selector: 'app-season-switch',
  imports: [
    JsonPipe,
    DatePipe,
    MatIcon
  ],
  templateUrl: './season-switch.html',
  styleUrl: './season-switch.scss',
})
export default class SeasonSwitch {
  private dialogRef = inject(MatDialog);
  private overlayHelper = inject(OverlayHelper);
  private manager = inject(SeasonManager);
  seasons = this.manager.getList()

  protected setSeason(season: SeasonEntity) {
   this.manager.currentSeason.set(season);
  }

  protected setActive(season: SeasonEntity) {
    this.manager.setActive(season);
  }

  protected close(){
    this.dialogRef.closeAll();
    this.overlayHelper.getRef()?.dispose();
    this.overlayHelper.setRef(null)
  };

}
