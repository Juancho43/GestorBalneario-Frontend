import {Component, input} from '@angular/core';
import {ReservationCard} from '../../reservations/reservation-card/reservation-card';
import {ShadowDetailsDTO} from '../../../core/Interfaces/Details/ShadowDetailsDTO';
import {ShadowCard} from '../shadow-card/shadow-card';

@Component({
  selector: 'app-shadow-detail',
  imports: [
    ReservationCard,
    ShadowCard
  ],
  templateUrl: './shadow-detail.html',
  styleUrl: './shadow-detail.scss',
})
export class ShadowDetail {
  shadowData = input<ShadowDetailsDTO | undefined>(undefined)
}
