import {Component, inject, input} from '@angular/core';
import {ReservationListManager} from '../../../core/services/Managers/reservation-list-manager';
import {JsonPipe} from '@angular/common';
import {RouterLink } from '@angular/router';
import {ReservationEntity} from '../../../core/model/reservationEntity';
import {Dialog} from '@angular/cdk/dialog';
import {ReservationDetail} from '../reservation-detail/reservation-detail';

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
  readonly list = input<ReservationEntity[]>();
  private dialog = inject(Dialog);
  protected openReservationDialog(reservation: ReservationEntity) {
    this.reservationListManager.currentReservation.set(reservation);
    this.dialog.open(ReservationDetail);
  }
}
