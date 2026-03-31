import {Component, computed, inject} from '@angular/core';
import {GetSeasonsHttp} from '../../../core/services/SeasonHttp/get-seasons-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {DatePipe, JsonPipe} from '@angular/common';
import {Dialog} from '@angular/cdk/dialog';
import {SeasonsEditor} from '../seasons-editor/seasons-editor';
import {SeasonEntity} from '../../../core/model/SeasonEntity';
import {SeasonManager} from '../../../core/services/Managers/season-manager';

@Component({
  selector: 'app-season-switch',
  imports: [
    JsonPipe,
    DatePipe
  ],
  templateUrl: './season-switch.html',
  styleUrl: './season-switch.scss',
})
export default class SeasonSwitch {
  private getList = inject(GetSeasonsHttp);
  private seasonManager = inject(SeasonManager);
  private dialog = inject(Dialog);
  seasonsResource = rxResource({
    stream: () => this.getList.get()
  });
  seasons = computed(()=>this.seasonsResource.value());

  protected openSeasonEditor() {
    this.dialog.open(SeasonsEditor);
  }

  protected setSeason(season: SeasonEntity) {
   this.seasonManager.currentSeason.set(season);
  }
}
