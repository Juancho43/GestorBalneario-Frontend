import {Component, computed, effect, inject, linkedSignal, signal, ViewChild} from '@angular/core';
import {ShadowManager} from '../../core/services/Managers/shadow-manager.service';
import {ShadowMap} from '../../components/shadows/shadow-map/shadow-map';
import {ShadowEntity} from '../../core/model/shadowEntity';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import {ShadowTypeList} from '../../components/shadows/shadow-list/shadow-type-list.component';
import {ShadowForm} from '../../components/shadows/shawdow-form/shadow-form.component';
import {NewShadow} from '../../components/shadows/new-shadow/new-shadow';
import {SeasonManager} from '../../core/services/Managers/season-manager';
import {FabAction, FABMenu} from '../../components/layout/fab-menu/fab-menu';
import {Router} from '@angular/router';
import {SideSheet} from '../../components/layout/side-sheet/side-sheet';
import {DialogHelper} from '../../core/utils/dialog-helper';

@Component({
  selector: 'app-shadow-editor',
  imports: [
    ShadowTypeList,
    ShadowMap,
    ShadowForm,
    FABMenu,
    SideSheet,
  ],
  templateUrl: './shadow-editor.html',
  styleUrl: './shadow-editor.scss',
})
export default class ShadowEditor {
  private router = inject(Router);
  private dialog = inject(DialogHelper);
  private currentSeason = inject(SeasonManager);
  private shadowList = inject(ShadowManager);
  protected season = computed(()=> this.currentSeason.currentSeason());
  protected shadows = linkedSignal(() => this.shadowList.shadows());
  protected currentShadow = signal<ShadowEntity | undefined>(undefined);
  @ViewChild(ShadowMap) shadowMap!: ShadowMap;

  protected readonly actions = signal<FabAction[]>([{
    name: "Ver mapa",
    icon: "info",
    tooltip: "Ver mapa"
  },
    {
    name:"Crear reserva",
    icon:"add",
    tooltip: "Crear reserva"
  },
    {
      name:'Abrir editor',
      icon:'edit',
      tooltip:'Abrir editor'
    }
  ]);
  protected readonly sideSheetOpen = signal<boolean>(true);

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
    const dialog = this.dialog.openDialog(NewShadow,this.dialog.getConfig());
    dialog.afterClosed().subscribe(result => {
      if(result){
        const newShadow = event.shadow;
        newShadow.identifier = result!.identifier;
        this.shadowList.addShadow(newShadow);
      }
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
        this.router.navigateByUrl('map')
      }else if($event === 'Crear reserva'){
        this.router.navigateByUrl('reservation-create')
      }else if($event === 'Abrir editor'){
        this.sideSheetOpen.set(true);
      }
  }
}
