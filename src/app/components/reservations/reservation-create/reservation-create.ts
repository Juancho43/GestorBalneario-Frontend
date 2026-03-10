import {Component, inject} from '@angular/core';
import {ReservationForm} from '../reservation-form/reservation-form';
import {ReservationListManager} from '../../../core/services/reservation-list-manager';

@Component({
  selector: 'app-reservation-create',
  imports: [
    ReservationForm
  ],
  templateUrl: './reservation-create.html',
  styleUrl: './reservation-create.scss',
})
export class ReservationCreate {
  private reservationListManager = inject(ReservationListManager);
  handle(reservation: any) {
    this.reservationListManager.addReservation(reservation);
  }
}
