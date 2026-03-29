import {Component, computed, inject, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ReservationEntity} from '../../../core/model/reservationEntity';
import {MatCard} from '@angular/material/card';
import {Dialog} from '@angular/cdk/dialog';
import {ReservationDetail} from '../reservation-detail/reservation-detail';

@Component({
  selector: 'app-reservation-card',
  imports: [MatCard, DatePipe],
  templateUrl: './reservation-card.html',
  styleUrl: './reservation-card.scss',
})
export class ReservationCard {
  readonly reservation = input.required<ReservationEntity>();
  duration = computed(()=> (new Date(this.reservation().dates.checkOut)).getDate() -(new Date(this.reservation().dates.checkIn)).getDate());
  dialog = inject(Dialog);
  protected openDetailDialog() {
    this.dialog.open(ReservationDetail);
  }
}

