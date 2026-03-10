import {Component, computed, inject, signal} from '@angular/core';
import {ShadowMap} from '../shadow-map/shadow-map';
import {ShadowDetail} from '../shadow-detail/shadow-detail';
import {ShadowMapper} from '../../../core/services/shadow-mapper.service';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {ShadowListManager} from '../../../core/services/shadow-list-manager';

@Component({
  selector: 'app-shadow-viewer',
  imports: [
    ShadowMap,
    ShadowDetail
  ],
  templateUrl: './shadow-viewer.html',
  styleUrl: './shadow-viewer.scss',
})
export class ShadowViewer {
  private shadowMapper = inject(ShadowMapper);
  private shadowList = inject(ShadowListManager);
  shadows = computed(() => this.shadowList.getList());
  currentShadow = signal<ShadowEntity>({} as ShadowEntity);
  show($event: any) {
    this.currentShadow.set(this.shadowMapper.createShadowFromFabric($event)!);
  }
}
