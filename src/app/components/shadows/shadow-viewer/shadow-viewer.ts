import {Component, computed, inject, signal} from '@angular/core';
import {ShadowMap} from '../shadow-map/shadow-map';
import {ShadowDetail} from '../shadow-detail/shadow-detail';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {ShadowListManager} from '../../../core/services/Managers/shadow-list-manager';

@Component({
  selector: 'app-shadow-viewer',
  imports: [
    ShadowMap,
    ShadowDetail
  ],
  templateUrl: './shadow-viewer.html',
  styleUrl: './shadow-viewer.scss',
})
export default class ShadowViewer {
  private shadowList = inject(ShadowListManager);
  shadows = computed(() => this.shadowList.getList());
  currentShadow = signal<ShadowEntity | undefined>({} as ShadowEntity);
  show($event: any) {
    this.currentShadow.set(this.shadowList.getByCoords({x:$event.left,y:$event.top}));
  }
}
