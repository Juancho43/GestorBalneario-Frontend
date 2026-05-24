import {Component, computed, inject, ViewChild} from '@angular/core';
import {SeasonManager} from '../../../core/services/Managers/season-manager';
import SeasonSwitch from '../season-switch/season-switch';
import {Dialog} from '@angular/cdk/dialog';
import {OverlayHelper} from '../../../core/utils/overlay-helper';
@Component({
  selector: 'app-current-season-display',
  imports: [
  ],
  templateUrl: './current-season-display.html',
  styleUrl: './current-season-display.scss',
})
export class CurrentSeasonDisplay {

  private seasonManager = inject(SeasonManager);
  private overlayHelper = inject(OverlayHelper);
  isOverlayOpen = false;
  @ViewChild('overlayOrigin') overlayOrigin: any;
  season = computed(()=>this.seasonManager.currentSeason());

  openSwicher(){
    this.isOverlayOpen = true;
    const config = this.overlayHelper.getDropdownConfig(this.overlayOrigin);
    const ref = this.overlayHelper.open(SeasonSwitch, config);
    ref.backdropClick().subscribe(()=>{
      ref!.dispose();
      this.isOverlayOpen = false;
    })
  }
}

