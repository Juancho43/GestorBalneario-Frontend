import {Component, computed, inject, signal} from '@angular/core';
import {ShadowListManager} from '../../../core/services/Managers/shadow-list-manager';
import {ReservationListManager} from '../../../core/services/Managers/reservation-list-manager';
import {ShadowMap} from '../../shadows/shadow-map/shadow-map';
import {ReservationList} from '../reservation-list/reservation-list';
import {ReservationEntity} from '../../../core/model/reservationEntity';
import {GetActiveReservationsHttp} from '../../../get-active-reservations-http';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-reservation-viewer',
  imports: [
    ShadowMap,
    ReservationList
  ],
  templateUrl: './reservation-viewer.html',
  styleUrl: './reservation-viewer.scss',
})
export class ReservationViewer {
  private shadowListManager = inject(ShadowListManager);

  private getActive = inject(GetActiveReservationsHttp);
  private reservationListManager = inject(ReservationListManager);
  shadows = computed(()=>this.shadowListManager.getList());
  reservationResource = rxResource({
    stream: () => this.getActive.get()
  })

  reservations = computed(()=>this.reservationResource.value());

}
