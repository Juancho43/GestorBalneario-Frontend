import {Component, computed, inject} from '@angular/core';
import {ReservationListManager} from '../../../core/services/Managers/reservation-list-manager';
import {JsonPipe} from '@angular/common';
import {ClientCard} from '../../clients/client-card/client-card';
import {ShadowForm} from '../../shadows/shawdow-form/shadow-form.component';
import {ShadowCard} from '../../shadows/shadow-card/shadow-card';
import {ReservationCard} from '../reservation-card/reservation-card';

@Component({
  selector: 'app-reservation-detail',
  imports: [
    JsonPipe,
    ClientCard,
    ShadowForm,
    ShadowCard,
    ReservationCard
  ],
  templateUrl: './reservation-detail.html',
  styleUrl: './reservation-detail.scss',
})
export class ReservationDetail {
  private reservationListManager = inject(ReservationListManager);
  reservation = computed(() => this.reservationListManager.currentReservation());
}
