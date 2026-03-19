import {Component, input} from '@angular/core';
import {DatePipe, JsonPipe} from '@angular/common';
import {ReservationEntity} from '../../../core/model/reservationEntity';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-reservation-card',
  imports: [JsonPipe, MatCard, DatePipe],
  templateUrl: './reservation-card.html',
  styleUrl: './reservation-card.scss',
})
export class ReservationCard {
  readonly reservation = input.required<ReservationEntity>();
}

