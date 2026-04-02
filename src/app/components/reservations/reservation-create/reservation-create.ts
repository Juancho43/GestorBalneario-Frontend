import {Component, computed, inject, linkedSignal, signal} from '@angular/core';
import {ReservationForm} from '../reservation-form/reservation-form';
import {ReservationListManager} from '../../../core/services/Managers/reservation-list-manager';
import {ShadowMap} from '../../shadows/shadow-map/shadow-map';
import {ShadowListManager} from '../../../core/services/Managers/shadow-list-manager';
import {ClientEntity} from '../../../core/model/clientEntity';
import {ClientCard} from '../../clients/client-card/client-card';
import {Dialog} from '@angular/cdk/dialog';
import {ClientManagerDialog} from '../../clients/client-searcher-dialog/client-manager-dialog.component';
import {ClientListManager} from '../../../core/services/Managers/client-list-manager';
import {ReservationEntity} from '../../../core/model/reservationEntity';
import {ShadowCard} from '../../shadows/shadow-card/shadow-card';
import {ShadowMapHttp} from '../../../core/services/ShadowHttp/shadow-map-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {ShadowEntity} from '../../../core/model/shadowEntity';

@Component({
  selector: 'app-reservation-create',
  imports: [
    ReservationForm,
    ShadowMap,
    ClientCard,
    ShadowCard
  ],
  templateUrl: './reservation-create.html',
  styleUrl: './reservation-create.scss',
})
export class ReservationCreate {
  private shadowManager = inject(ShadowListManager);
  private clientManager = inject(ClientListManager);
  private matDialog = inject(Dialog);

  private mapHttp = inject(ShadowMapHttp);
  mapResource = rxResource({
    stream:() => this.mapHttp.get()
  })
  shadows = computed(() =>{
    let list: ShadowEntity[] = [];
    if(this.mapResource.value() && !this.mapResource.error()){
      this.mapResource.value()?.map.forEach(row =>
        list.push(row.shadow)
      )
    }
    return list
  } );
  client = linkedSignal<ClientEntity>(()=>this.clientManager.currentClient() || {name: '', email: '', phone:''});
  shadow = signal(this.shadows()[0] || {
  coords: {
    x:0,
    y:0
  }

  }as ShadowEntity);
  private reservationListManager = inject(ReservationListManager);
  createReservation(reservation: ReservationEntity) {
    this.reservationListManager.addReservation(reservation);
  }
  openClientDialog(): void {
       this.matDialog.open(ClientManagerDialog);
  }
  protected setShadow(event: any) {
   this.shadow.set(this.shadowManager.getByIdentifier(event._objects[1].text)!);
  }
}
