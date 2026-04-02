import {Component, computed, inject, signal, ViewChild} from '@angular/core';
import {ShadowListManager} from '../../../core/services/Managers/shadow-list-manager';
import {ShadowMap} from '../../shadows/shadow-map/shadow-map';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import {ShadowList} from '../../shadows/shadow-list/shadow-list';
import {ShadowForm} from '../../shadows/shawdow-form/shadow-form.component';
import {Dialog} from '@angular/cdk/dialog';
import {NewShadow} from '../../shadows/new-shadow/new-shadow';
import {SeasonManager} from '../../../core/services/Managers/season-manager';

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
export default class ShadowEditor {
  private shadowList = inject(ShadowListManager);
  private currentSeason = inject(SeasonManager);
  season = this.currentSeason.currentSeason;
  shadows = computed(() => this.shadowList.getList());
  private dialog = inject(Dialog);
  @ViewChild(ShadowMap) shadowMap!: ShadowMap;
  currentShadow = signal<ShadowEntity>({identifier: '',state:'available', name: '', type: 'carpa', coords: {x: 0, y: 0}});

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
