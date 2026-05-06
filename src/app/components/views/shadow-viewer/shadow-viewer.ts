import {Component, effect, inject, linkedSignal} from '@angular/core';
import {ShadowMap} from '../../shadows/shadow-map/shadow-map';
import {ShadowDetail} from '../../shadows/shadow-detail/shadow-detail';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {ShadowManager} from '../../../core/services/Managers/shadow-manager.service';
import {Dialog} from '@angular/cdk/dialog';

@Component({
  selector: 'app-shadow-viewer',
  imports: [
    ShadowMap,
  ],
  templateUrl: './shadow-viewer.html',
  styleUrl: './shadow-viewer.scss',
})
export default class ShadowViewer {
  private shadowList = inject(ShadowManager);
  private dialog = inject(Dialog);

  shadows = linkedSignal(() => this.shadowList.shadows());
  constructor() {
    effect(() => {
      this.shadowList.shadowsResource.reload();
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
   this.openShadowDetailDialog()
  }

  protected openShadowDetailDialog() {
    this.shadowList.currentShadow.set(this.currentShadow());
    this.dialog.open(ShadowDetail)
  }
}
