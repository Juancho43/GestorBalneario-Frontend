import {Component, computed, inject, signal, ViewChild} from '@angular/core';
import {ShadowMapper} from '../../../core/services/shadow-mapper.service';
import {ShadowListManager} from '../../../core/services/Managers/shadow-list-manager';
import {ShadowMap} from '../shadow-map/shadow-map';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import {ShadowList} from '../shadow-list/shadow-list';
import {ShadowForm} from '../shawdow-form/shadow-form.component';
import {Dialog} from '@angular/cdk/dialog';
import {NewShadow} from '../../../new-shadow/new-shadow';

@Component({
  selector: 'app-shadow-editor',
  imports: [
    ShadowList,
    ShadowMap,
    ShadowForm,
  ],
  templateUrl: './shadow-editor.html',
  styleUrl: './shadow-editor.scss',
})
export class ShadowEditor {
  private shadowMapper= inject(ShadowMapper);
  private shadowList = inject(ShadowListManager);
  shadows = computed(() => this.shadowList.getList());
  private dialog = inject(Dialog);
  @ViewChild(ShadowMap) shadowMap!: ShadowMap;
  currentShadow = signal<ShadowEntity>({identifier: '',state:'active', name: '', type: '', coords: {x: 0, y: 0}});

  /**
   * new shadow dragged on map
   */

  updateMap(event: {event: CdkDragEnd, shadow: ShadowEntity}) {
    this.shadowMap.onShadowDropped(event);
  }

  /**
   * Shadow created
   * @param event
   */

  addShadow(event: any) {
    const dialog = this.dialog.open<ShadowEntity,any>(NewShadow);
    dialog.closed.subscribe(result => {
      const newShadow = event.shadow;
      newShadow.identifier = result!.identifier;
      this.shadowList.addShadow(newShadow);
    })
  }

  /**
   * Shadow moved
   * @param event
   */
  movedShadowHandler(event: any){
    const shadow = this.shadowList.getByIdentifier(event._objects[1].text);
    if(shadow){
      shadow.coords = {x: event.left, y: event.top};
      this.shadowList.updateShadow(shadow);
      this.currentShadow.set(shadow);
    }
  }
  /**
   * Shadow selected on map
   * */
  selectShadowHandler(event: any) {
    const selected = this.shadowList.getByIdentifier(event._objects[1].text);
    this.currentShadow.set(selected!);
  };

  /**
   * Text changed
   * */
  identifierChangedHandler(event: any) {
    this.shadowList.updateShadow(event);
  }

  /**
   * Shadow deleted
   */
  deleteShadow(event: any) {
    const selected = this.shadowList.getByIdentifier(event._objects[1].text);
    if(selected){
      this.shadowList.deleteShadow(selected.id!);
    }
  }
}
