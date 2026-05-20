import {Component, inject, input} from '@angular/core';
import {ReservationManager} from '../../../core/services/Managers/reservation-manager.service';
import {ReservationEntity} from '../../../core/model/reservationEntity';
import {Dialog} from '@angular/cdk/dialog';
import {ReservationDetail} from '../reservation-detail/reservation-detail';
import {ReservationCard} from '../reservation-card/reservation-card';
import {ReservationSearcher} from '../reservation-searcher/reservation-searcher';
import {Paginator} from '../../paginator/paginator';

@Component({
  selector: 'app-reservation-list',
  imports: [
    ReservationCard,
    ReservationSearcher,
    Paginator,
  ],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.scss',
})
export class ReservationList {
  private reservationListManager = inject(ReservationManager);
  readonly list = input<ReservationEntity[]>();
  private dialog = inject(Dialog);
  protected openReservationDialog(reservation: ReservationEntity) {
    this.reservationListManager.currentReservation.set(reservation);
    this.dialog.open(ReservationDetail);
  }
}
