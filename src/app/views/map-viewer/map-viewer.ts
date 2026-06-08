import {Component, effect, inject, linkedSignal, signal} from '@angular/core';
import {ShadowMap} from '../../components/shadows/shadow-map/shadow-map';
import {ShadowManager} from '../../core/services/Managers/shadow-manager.service';
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
  private router = inject(Router);
  shadows = linkedSignal(() => this.shadowList.shadows());
  constructor() {
    effect(() => {
      this.shadowList.shadowsResource.reload();
    });
  }

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
    const shadow = this.shadowList.getByCoords({x: $event.left, y: $event.top})!
    this.router.navigate(['/shadow-view',shadow.id!]);
  }


  protected handleMenuAction($event: string) {
      if($event ==='Editar mapa'){
        this.router.navigateByUrl('shadow-editor')
      }else if($event === 'Crear reserva'){
        this.router.navigateByUrl('reservation-create')
      }
  }
}
