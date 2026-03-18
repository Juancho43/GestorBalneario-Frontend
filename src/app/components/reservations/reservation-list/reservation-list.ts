import {Component, computed, inject, input} from '@angular/core';
import {ReservationListManager} from '../../../core/services/Managers/reservation-list-manager';
import {JsonPipe} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ReservationEntity} from '../../../core/model/reservationEntity';

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
  readonly list = input<ReservationEntity[]>();
}
