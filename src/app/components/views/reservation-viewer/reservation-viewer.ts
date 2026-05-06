import {Component, computed, inject} from '@angular/core';
import {ReservationListManager} from '../../../core/services/Managers/reservation-list-manager';
import {GetActiveReservationsHttp} from '../../../core/services/ReservationHttp/get-active-reservations-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {MapItem} from '../../../core/DTO/ShadowMapDTO';
import {ReservationCard} from '../../reservations/reservation-card/reservation-card';
import {ReservationSearcher} from '../../reservations/reservation-searcher/reservation-searcher';

@Component({
  selector: 'app-reservation-viewer',
  imports: [
    ReservationCard,
    ReservationSearcher
  ],
  templateUrl: './reservation-viewer.html',
  styleUrl: './reservation-viewer.scss',
})
export class ReservationViewer {
  private getActive = inject(GetActiveReservationsHttp);
  private reservationListManager = inject(ReservationListManager);


  reservationResource = rxResource({
    stream: () => this.getActive.get()
  })

  reservations = computed(()=>
  {
    if (!this.reservationResource.isLoading() && !this.reservationResource.error()){
      return this.reservationResource.value()?.data!
    }else{
      return [];
    }
  });

  protected selectReservation(item: MapItem) {
    this.reservationListManager.currentReservation.set(item.reservation!);
  }
}
