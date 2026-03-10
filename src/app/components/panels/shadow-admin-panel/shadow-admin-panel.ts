import {Component, computed, inject, signal, ViewChild} from '@angular/core';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import {ShadowMap} from '../../../shadow-map/shadow-map';
import {ShadowList} from '../../../shadow-list/shadow-list';
import {ShadowForm} from '../../../shawdow-form/shadow-form.component';
import {ShadowListManager} from '../../../core/services/shadow-list-manager';
import {ShadowMapper} from '../../../core/services/shadow-mapper.service';
import {ShadowEntity} from '../../../core/services/shadowEntity';
@Component({
  selector: 'app-shadow-admin-panel',
  imports: [
    ShadowMap,
    ShadowList,
    ShadowForm
  ],
  templateUrl: './shadow-admin-panel.html',
  styleUrl: './shadow-admin-panel.scss',
})
export class ShadowAdminPanel {
  private shadowMapper= inject(ShadowMapper);
  private shadowList = inject(ShadowListManager);
  shadows = computed(()=>this.shadowList.getList());
  @ViewChild(ShadowMap) shadowMap!: ShadowMap;

  currentShadow = signal<ShadowEntity>({identifier: '', name: '', type: '', coords: {x: 0, y: 0}});
  updateMap(event: {event: CdkDragEnd, shadow: ShadowEntity}) {
    this.shadowMap.addShape(event);
  }


  addShadow(event: any) {
    let etl = this.shadowMapper.createShadowFromFabric(event);
    this.shadowList.addShadow(etl!);

  }

  updateShadow(event: ShadowEntity){
  }
  show(event: any) {
    let text = event._objects[1].text ?? '...';
    this.currentShadow.set({identifier:text, coords:{
          x: event.left,
          y: event.top,
        },
        name: this.shadowMapper.setName(event._objects[0].type),
        type: event._objects[0].type
      }
    );
  };

  updatedShadow(event: any) {
    console.log('Updated shadow received in admin panel:', event);
    this.shadowList.updateShadow(event);
    this.currentShadow.set(event);
    this.shadowMap.updateShapeText(event);
  }

}


