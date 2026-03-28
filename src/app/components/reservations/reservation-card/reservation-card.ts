import {Component, computed, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {ReservationEntity} from '../../../core/model/reservationEntity';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-reservation-card',
  imports: [MatCard, DatePipe],
  templateUrl: './reservation-card.html',
  styleUrl: './reservation-card.scss',
})
export class ReservationCard {
  readonly reservation = input.required<ReservationEntity>();
  duration = computed(()=> (new Date(this.reservation().dates.checkOut)).getDate() -(new Date(this.reservation().dates.checkIn)).getDate());
}

