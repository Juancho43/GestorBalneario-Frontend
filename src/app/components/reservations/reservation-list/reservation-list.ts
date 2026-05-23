import {Component, input} from '@angular/core';
import {ReservationEntity} from '../../../core/model/reservationEntity';
import {MatIcon} from '@angular/material/icon';
import {CustomMenu} from '../../layout/custom-menu/custom-menu';
import {ReservationStatePipe} from '../../../core/utils/pipes/reservation-state-pipe';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-reservation-list',
  imports: [
    MatIcon,
    CustomMenu,
    ReservationStatePipe,
    DatePipe
  ],
  templateUrl: './reservation-list.html',
  styleUrl: './reservation-list.scss',
})
export class ReservationList {
  readonly list = input.required<ReservationEntity[]>();
}
