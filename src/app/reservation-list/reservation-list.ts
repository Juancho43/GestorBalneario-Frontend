import {Component, computed, inject} from '@angular/core';
import {ReservationListManager} from '../core/services/reservation-list-manager';
import {JsonPipe} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  imports: [
    JsonPipe,
    RouterLink,
  ],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.scss',
})
export class ReservationList {
  private reservationListManager = inject(ReservationListManager);
  reservations = computed(()=>this.reservationListManager.getList());
}
