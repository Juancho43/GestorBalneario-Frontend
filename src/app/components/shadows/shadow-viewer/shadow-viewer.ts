import {Component, computed, effect, inject, linkedSignal} from '@angular/core';
import {ShadowMap} from '../shadow-map/shadow-map';
import {ShadowDetail} from '../shadow-detail/shadow-detail';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {ShadowListManager} from '../../../core/services/Managers/shadow-list-manager';
import {Dialog} from '@angular/cdk/dialog';
import {rxResource} from '@angular/core/rxjs-interop';
import {GetShadowHttp} from '../../../core/services/ShadowHttp/get-shadow-http';
import {ShadowCard} from '../shadow-card/shadow-card';
import {ShadowMapHttp} from '../../../core/services/ShadowHttp/shadow-map-http';

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
  private mapHttp = inject(ShadowMapHttp);
  private shadowList = inject(ShadowListManager);
  private dialog = inject(Dialog);
  mapResource = rxResource({
    stream:() => this.mapHttp.get()
  })
  shadows = computed(() =>{
    let list: ShadowEntity[] = [];
    if(this.mapResource.value()){
      this.mapResource.value()?.map.forEach(row =>
        list.push(row.shadow)
      )
    }
    return list
  } );
  constructor() {
    effect(() => {
      this.shadowList.setList(this.shadows());
    });
  }
  currentShadow = linkedSignal(()=> this.shadows()[0] ||
    {
      id:'',
      identifier:'',
      coords:{
        x:0,
        y:0
      }
    } as ShadowEntity);

  protected show($event: any) {
   this.currentShadow.set(this.shadowList.getByCoords({x: $event.left, y: $event.top})!);
  }

  protected openShadowDetailDialog() {
    this.shadowList.currentShadow.set(this.currentShadow());
    this.dialog.open(ShadowDetail)
  }
}
