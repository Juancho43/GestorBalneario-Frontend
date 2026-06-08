import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {MatIcon} from '@angular/material/icon';
import {ShadowDetail} from '../../components/shadows/shadow-detail/shadow-detail';
import {ShadowListManager} from '../../components/shadows/shadow-list-manager/shadow-list-manager';
import {ShadowManager} from '../../core/services/Managers/shadow-manager.service';

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
  readonly id = input<string>();
  protected currentShadow = computed(()=> this.manager.currentShadowDetails());
  protected singlePane = signal(false);
  protected currentPane = signal('list');
  protected showList = computed(()=> this.singlePane() || this.currentPane() === 'list');
  protected showDetails = computed(()=> this.singlePane() || this.currentPane() === 'detail');
  constructor(){
    (new BreakpointObserver()).observe([Breakpoints.XSmall,Breakpoints.Small]).subscribe(result => {
      this.singlePane.set(!result.matches);
    })
    effect(() => {
      if(this.id() !== undefined){
        this.handleSelectShadow(this.id()!);
      }
    });
  }

  protected handleSelectShadow($event: string) {
    this.manager.selectedShadowId.set($event);
    this.currentPane.set('details');
  }
}
