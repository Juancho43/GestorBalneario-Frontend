import {Component, computed, inject, signal} from '@angular/core';
import {ShadowMap} from '../shadow-map/shadow-map';
import {ShadowDetail} from '../shadow-detail/shadow-detail';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {ShadowListManager} from '../../../core/services/Managers/shadow-list-manager';
import {Dialog} from '@angular/cdk/dialog';
import {rxResource} from '@angular/core/rxjs-interop';
import {GetShadowHttp} from '../../../core/services/ShadowHttp/get-shadow-http';
import {ShadowCard} from '../shadow-card/shadow-card';

@Component({
  selector: 'app-shadow-viewer',
  imports: [
    ShadowMap,
    ShadowCard
  ],
  templateUrl: './shadow-viewer.html',
  styleUrl: './shadow-viewer.scss',
})
export default class ShadowViewer {
  private shadowList = inject(ShadowListManager);
  private get = inject(GetShadowHttp);
  shadows = computed(() => this.shadowList.getList());
  shadowId = signal(this.shadows()[0].id!);
  shadowResource = rxResource({
    params: () => {return{id:this.shadowId()}},
    stream: ({params}) =>
      this.get.get(params.id)

  })

  currentShadow = computed(() => this.shadowResource.value())
  show($event: any) {
    this.shadowId.set(this.shadowList.getByCoords({x:$event.left,y:$event.top})?.id!);
  }
}
