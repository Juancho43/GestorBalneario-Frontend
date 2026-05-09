import {Component, computed, inject} from '@angular/core';
import {SeasonManager} from '../../../core/services/Managers/season-manager';
import SeasonSwitch from '../season-switch/season-switch';
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
  dialog = inject(Dialog);
  season = computed(()=>this.seasonManager.currentSeason());
  openDialog() {
    this.dialog.open(SeasonSwitch);
  }
}

