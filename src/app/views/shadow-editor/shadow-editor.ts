import {Component, effect, inject, linkedSignal, signal, ViewChild} from '@angular/core';
import {ShadowManager} from '../../core/services/Managers/shadow-manager.service';
import {ShadowMap} from '../../components/shadows/shadow-map/shadow-map';
import {ShadowEntity} from '../../core/model/shadowEntity';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import {ShadowTypeList} from '../../components/shadows/shadow-list/shadow-type-list.component';
import {ShadowForm} from '../../components/shadows/shawdow-form/shadow-form.component';
import {Dialog} from '@angular/cdk/dialog';
import {NewShadow} from '../../components/shadows/new-shadow/new-shadow';
import {SeasonManager} from '../../core/services/Managers/season-manager';
import {FabAction, FABMenu} from '../../components/layout/fab-menu/fab-menu';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shadow-editor',
  imports: [
    ShadowTypeList,
    ShadowMap,
    ShadowForm,
    FABMenu,
  ],
  templateUrl: './shadow-editor.html',
  styleUrl: './shadow-editor.scss',
})
export default class ShadowEditor {
  private dialog = inject(Dialog);
  private currentSeason = inject(SeasonManager);
  private shadowList = inject(ShadowManager);

  private router = inject(Router);
  season = this.currentSeason.currentSeason;

  shadows = linkedSignal(() => this.shadowList.shadows());
  @ViewChild(ShadowMap) shadowMap!: ShadowMap;
  currentShadow = signal<ShadowEntity>({identifier: '',state:'available', name: '', type: 'carpa', coords: {x: 0, y: 0}});

  protected readonly actions = signal<FabAction[]>([{
    name: "Ver mapa",
    icon: "info",
    tooltip: "Ver mapa"
  },{
    name:"Crear reserva",
    icon:"add",
    tooltip: "Crear reserva"
  }]);
  constructor() {
    effect(() => {
      this.season()
      this.shadowList.shadowsResource.reload();
    });
  }
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

 protected handleMenuAction($event: string) {
      if($event ==='Ver mapa'){
        this.router.navigateByUrl('shadow-view')
      }else if($event === 'Crear reserva'){
        this.router.navigateByUrl('reservation-create')
      }
  }
}
