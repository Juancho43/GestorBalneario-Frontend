import {Component, inject} from '@angular/core';
import {ReservationForm} from '../reservation-form/reservation-form';
import {ReservationListManager} from '../core/services/reservation-list-manager';

@Component({
  selector: 'app-reservation-edit',
  imports: [
    ReservationForm
  ],
  templateUrl: './reservation-edit.html',
  styleUrl: './reservation-edit.scss',
})
export class ReservationEdit {
  private reservationListManager = inject(ReservationListManager);
  handle(reservation: any) {
    this.reservationListManager.addReservation(reservation);
  }
}
