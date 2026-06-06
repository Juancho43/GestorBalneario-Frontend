import {Component, computed, inject, signal} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatIcon} from '@angular/material/icon';
import {ShadowDetail} from '../../components/shadows/shadow-detail/shadow-detail';
import {ShadowListManager} from '../../components/shadows/shadow-list-manager/shadow-list-manager';
import {ShadowManager} from '../../core/services/Managers/shadow-manager.service';
import {ShadowEntity} from '../../core/model/shadowEntity';

@Component({
  selector: 'app-shadow-viewer',
  imports: [
    MatIcon,
    ShadowDetail,
    ShadowListManager
  ],
  templateUrl: './shadow-viewer.html',
  styleUrl: './shadow-viewer.scss',
})
export class ShadowViewer {
  private manager = inject(ShadowManager);
  protected currentShadow = computed(()=> this.manager.currentShadowDetails());
  protected singlePane = signal(false);
  protected currentPane = signal('list');

  protected showList = computed(()=> this.singlePane() || this.currentPane() === 'list');
  protected showDetails = computed(()=> this.singlePane() || this.currentPane() === 'detail');
  constructor(){
    (new BreakpointObserver()).observe([Breakpoints.XSmall,Breakpoints.Small]).subscribe(result => {
      this.singlePane.set(!result.matches);
    })
  }

  protected handleSelectShadow($event: ShadowEntity) {
    this.manager.selectedShadowId.set($event.id!);
    this.currentPane.set('details');
  }
}
