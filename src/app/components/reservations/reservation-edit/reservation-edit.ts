import {Component, inject} from '@angular/core';
import {ReservationManager} from '../../../core/services/Managers/reservation-manager.service';

@Component({
  selector: 'app-reservation-edit',
  imports: [
  ],
  templateUrl: './reservation-edit.html',
  styleUrl: './reservation-edit.scss',
})
export class ReservationEdit {
  private reservationListManager = inject(ReservationManager);
  handle(reservation: any) {
    this.reservationListManager.addReservation(reservation);
  }
}
