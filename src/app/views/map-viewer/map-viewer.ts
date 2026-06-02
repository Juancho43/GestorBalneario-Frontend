import {Component, effect, inject, linkedSignal, signal} from '@angular/core';
import {ShadowMap} from '../../components/shadows/shadow-map/shadow-map';
import {ShadowDetail} from '../../components/shadows/shadow-detail/shadow-detail';
import {ShadowEntity} from '../../core/model/shadowEntity';
import {ShadowManager} from '../../core/services/Managers/shadow-manager.service';
import {Dialog} from '@angular/cdk/dialog';
import {FabAction, FABMenu} from '../../components/layout/fab-menu/fab-menu';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shadow-viewer',
  imports: [
    ShadowMap,
    FABMenu,
  ],
  templateUrl: './map-viewer.html',
  styleUrl: './map-viewer.scss',
})
export default class MapViewer {
  private shadowList = inject(ShadowManager);
  private dialog = inject(Dialog);
  private router = inject(Router);
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
  protected readonly actions = signal<FabAction[]>([{
    name: "Editar mapa",
    icon: "edit",
    tooltip: "Editar mapa"
  },{
    name:"Crear reserva",
    icon:"add",
    tooltip: "Crear reserva"
  }]);


  protected show($event: any) {
   this.currentShadow.set(this.shadowList.getByCoords({x: $event.left, y: $event.top})!);
   this.openShadowDetailDialog()
  }

  protected openShadowDetailDialog() {
    this.shadowList.currentShadow.set(this.currentShadow());
    this.dialog.open(ShadowDetail)
  }

  protected handleMenuAction($event: string) {
      if($event ==='Editar mapa'){
        this.router.navigateByUrl('shadow-editor')
      }else if($event === 'Crear reserva'){
        this.router.navigateByUrl('reservation-create')
      }
  }
}
