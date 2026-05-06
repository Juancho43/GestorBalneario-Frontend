import {Component, inject} from '@angular/core';
import {SeasonManager} from '../../../core/services/Managers/season-manager';
import SeasonSwitch from '../../views/season-switch/season-switch';
import {Dialog} from '@angular/cdk/dialog';
@Component({
  selector: 'app-current-season-display',
  imports: [
  ],
  templateUrl: './current-season-display.html',
  styleUrl: './current-season-display.scss',
})
export class CurrentSeasonDisplay {

  private seasonManager = inject(SeasonManager);
  season = this.seasonManager.currentSeason;
  dialog = inject(Dialog);
  openDialog() {
    this.dialog.open(SeasonSwitch);
  }
}

