import {Component, computed, inject} from '@angular/core';
import {ReservationListManager} from '../../../core/services/Managers/reservation-list-manager';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-reservation-detail',
  imports: [
    JsonPipe
  ],
  templateUrl: './reservation-detail.html',
  styleUrl: './reservation-detail.scss',
})
export class ReservationDetail {
  private reservationListManager = inject(ReservationListManager);
  reservation = computed(() => this.reservationListManager.currentReservation());
}
