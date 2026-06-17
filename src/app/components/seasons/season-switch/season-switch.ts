import {Component, computed, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {SeasonEntity} from '../../../core/model/SeasonEntity';
import {SeasonManager} from '../../../core/services/Managers/season-manager';
import {MatIcon} from '@angular/material/icon';
import {MatDialog} from '@angular/material/dialog';
import {OverlayHelper} from '../../../core/utils/other/overlay-helper';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-season-switch',
  imports: [
    JsonPipe,
    MatIcon,
    MatTooltip
  ],
  templateUrl: './season-switch.html',
  styleUrl: './season-switch.scss',
})
export default class SeasonSwitch {
  private dialogRef = inject(MatDialog);
  private overlayHelper = inject(OverlayHelper);
  private manager = inject(SeasonManager);
  protected seasons = this.manager.getList()
  protected currentSeason = computed(()=>this.manager.currentSeason()!);
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
