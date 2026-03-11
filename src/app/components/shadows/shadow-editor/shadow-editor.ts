import {Component, computed, inject, signal, ViewChild} from '@angular/core';
import {ShadowMapper} from '../../../core/services/shadow-mapper.service';
import {ShadowListManager} from '../../../core/services/shadow-list-manager';
import {ShadowMap} from '../shadow-map/shadow-map';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import {ShadowList} from '../shadow-list/shadow-list';
import {ShadowForm} from '../shawdow-form/shadow-form.component';

@Component({
  selector: 'app-shadow-editor',
  imports: [
    ShadowList,
    ShadowMap,
    ShadowForm
  ],
  templateUrl: './shadow-editor.html',
  styleUrl: './shadow-editor.scss',
})
export class ShadowEditor {
  private shadowMapper= inject(ShadowMapper);
  private shadowList = inject(ShadowListManager);
  formState = signal<'create' | 'edit'>('create');
  shadows = computed(() => this.shadowList.getList());

  @ViewChild(ShadowMap) shadowMap!: ShadowMap;
  currentShadow = signal<ShadowEntity>({identifier: '', name: '', type: '', coords: {x: 0, y: 0}});

  /**
   * new shadow dragged on map
   */

  updateMap(event: {event: CdkDragEnd, shadow: ShadowEntity}) {
    this.shadowMap.addShape(event);
  }

  /**
   * Shadow created
   * @param event
   */

  addShadow(event: any) {
    let etl = this.shadowMapper.createShadowFromFabric(event);
    this.shadowList.addShadow(etl!);
    this.formState.set('create');
  }

  /**
   * Shadow moved
   * @param event
   */
  updateShadow(event: ShadowEntity){
    console.log('update shadow', event);
    // this.shadowList.updateShadow(event);
    this.currentShadow.set(event);
  }
  /**
   * Shadow selected on map
   * */
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

  /**
   * Text changed
   * */
  updatedShadow(event: any) {
    this.shadowList.updateShadow(event);
    this.currentShadow.set(event);
    this.shadowMap.updateShapeText(event);
  }

  /**
   * Shadow deleted
   */
  deleteShadow($event: any) {
    //pulir
    this.shadowList.deleteShadow($event.id);
  }
}
