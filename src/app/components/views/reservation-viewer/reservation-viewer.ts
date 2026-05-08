import {Component, computed, inject, signal} from '@angular/core';
import {ReservationManager} from '../../../core/services/Managers/reservation-manager.service';
import {GetActiveReservationsHttp} from '../../../core/services/ReservationHttp/get-active-reservations-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {MapItem} from '../../../core/DTO/ShadowMapDTO';
import {ReservationCard} from '../../reservations/reservation-card/reservation-card';
import {ReservationSearcher} from '../../reservations/reservation-searcher/reservation-searcher';
import {ReservationForm} from '../../reservations/reservation-form/reservation-form';
import {ReservationEntity} from '../../../core/model/reservationEntity';

@Component({
  selector: 'app-reservation-viewer',
  imports: [
    ReservationCard,
    ReservationSearcher,
    ReservationForm
  ],
  templateUrl: './reservation-viewer.html',
  styleUrl: './reservation-viewer.scss',
})
export class ReservationViewer {
  private manager = inject(ReservationManager);
  active = signal<boolean>(false);
  reservations = computed(()=>
  {
    if(this.active()){
      return this.manager.getActive();
    }else{
      return this.manager.getList();
    }
  });

  protected selectReservation(item: MapItem) {
    this.manager.currentReservation.set(item.reservation!);
  }

  protected handleSubmit($event: ReservationEntity) {

  }

  protected currentReservation() {

  }
}
