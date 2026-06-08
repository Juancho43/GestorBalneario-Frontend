import {Component, input} from '@angular/core';
import {ClientCard} from '../../clients/client-card/client-card';
import {ReservationCard} from '../reservation-card/reservation-card';
import {InvoiceCard} from '../../invoices/invoice-card/invoice-card';
import {ShadowCard} from '../../shadows/shadow-card/shadow-card';
import {ReservationDetailsDTO} from '../../../core/Interfaces/Details/ReservationDetailsDTO';

@Component({
  selector: 'app-reservation-detail',
  imports: [
    ClientCard,
    ReservationCard,
    InvoiceCard,
    ShadowCard,
  ],
  templateUrl: './reservation-detail.html',
  styleUrl: './reservation-detail.scss',
})
export class ReservationDetail{
  reservationData = input<ReservationDetailsDTO | undefined>(undefined);

}
