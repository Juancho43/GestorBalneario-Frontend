import {Component, computed, signal} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatIcon} from '@angular/material/icon';
import {ShadowDetail} from '../../components/shadows/shadow-detail/shadow-detail';
import {ShadowListManager} from '../../components/shadows/shadow-list-manager/shadow-list-manager';

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
  protected selectedShadow = computed(()=> {return false})
  protected singlePane = signal(false);
  protected currentPane = signal('list');
  protected showList = computed(()=>{
    if(this.singlePane()) return true;
    return this.currentPane() === 'list';

  })
  protected showDetails = computed(()=>{
    if(this.singlePane()) return true;
    return this.currentPane() === 'detail';
  })
  constructor(){
    (new BreakpointObserver()).observe(['(max-width: 800px)']).subscribe(result => {
      if (result.matches) {
        this.singlePane.set(false);
      } else {
        this.singlePane.set(true);
      }
    })
  }
}
