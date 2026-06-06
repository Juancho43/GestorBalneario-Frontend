import {Component, computed, inject, signal, ViewChild} from '@angular/core';
import {SeasonManager} from '../../../core/services/Managers/season-manager';
import SeasonSwitch from '../season-switch/season-switch';
import {OverlayHelper} from '../../../core/utils/overlay-helper';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-current-season-display',
  imports: [
    MatIcon,
    MatTooltip
  ],
  templateUrl: './current-season-display.html',
  styleUrl: './current-season-display.scss',
})
export class CurrentSeasonDisplay {

  private seasonManager = inject(SeasonManager);
  private overlayHelper = inject(OverlayHelper);
  protected isOverlayOpen = computed(()=>this.overlayHelper.getRef());
  protected season = computed(()=>this.seasonManager.currentSeason());
  protected isMobile = signal(false);
  @ViewChild('overlayOrigin') overlayOrigin: any;

  constructor() {
    (new BreakpointObserver()).observe([Breakpoints.XSmall]).subscribe(result => {
      this.isMobile.set(result.matches);
    })
  }

  openSwitcher(){
    if(!this.isOverlayOpen()){

      const config = this.overlayHelper.getDropdownConfig(this.overlayOrigin);
      const ref = this.overlayHelper.open(SeasonSwitch, config);
      this.overlayHelper.setRef(ref);

      ref.backdropClick().subscribe(()=>{
        ref!.dispose();
        this.overlayHelper.setRef(null)
      })
    }
  }
}

