import {Component, computed, inject} from '@angular/core';
import {ReservationListManager} from '../../../core/services/Managers/reservation-list-manager';
import {ShadowMap} from '../../shadows/shadow-map/shadow-map';
import {GetActiveReservationsHttp} from '../../../get-active-reservations-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {ShadowMapHttp} from '../../../core/services/ShadowHttp/shadow-map-http';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {MapCard} from '../../map/map-card/map-card';
import {MapItem} from '../../../core/DTO/ShadowMapDTO';

@Component({
  selector: 'app-reservation-viewer',
  imports: [
    ShadowMap,
    MapCard
  ],
  templateUrl: './reservation-viewer.html',
  styleUrl: './reservation-viewer.scss',
})
export class ReservationViewer {
  private mapHttp = inject(ShadowMapHttp);
  private getActive = inject(GetActiveReservationsHttp);
  mapResource = rxResource({
    stream:() => this.mapHttp.get()
  })
  private reservationListManager = inject(ReservationListManager);
  shadows = computed(() =>{
    let list: ShadowEntity[] = [];
    if(this.mapResource.value()){
      this.mapResource.value()?.map.forEach(row =>
        list.push(row.shadow)
      )
    }
    return list
  } );
  reservationResource = rxResource({
    stream: () => this.getActive.get()
  })

  reservations = computed(()=>this.reservationResource.value());

  protected selectReservation(item: MapItem) {

    this.reservationListManager.currentReservation.set(item.reservation!);
  }
}
