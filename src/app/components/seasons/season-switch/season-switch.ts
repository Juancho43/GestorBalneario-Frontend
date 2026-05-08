import {Component, computed, inject} from '@angular/core';
import {GetSeasonsHttp} from '../../../core/services/SeasonHttp/get-seasons-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {DatePipe, JsonPipe} from '@angular/common';
import {Dialog} from '@angular/cdk/dialog';
import {SeasonsEditor} from '../../views/seasons-editor/seasons-editor';
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
  private manager = inject(SeasonManager);
  seasons = this.manager.getList()

  protected setSeason(season: SeasonEntity) {
   this.manager.currentSeason.set(season);
  }

  protected setActive(season: SeasonEntity) {
    this.manager.setActive(season);
  }
}
