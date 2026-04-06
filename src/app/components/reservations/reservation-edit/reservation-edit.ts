import {Component, inject} from '@angular/core';
import {ReservationListManager} from '../../../core/services/Managers/reservation-list-manager';

@Component({
  selector: 'app-reservation-edit',
  imports: [
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
