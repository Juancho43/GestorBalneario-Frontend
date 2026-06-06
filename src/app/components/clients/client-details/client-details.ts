import {Component, input} from '@angular/core';
import {InvoiceCard} from '../../invoices/invoice-card/invoice-card';
import {ClientCard} from '../client-card/client-card';
import {ClientDetailsDTO} from '../../../core/Interfaces/Details/ClientDetailsDTO';

@Component({
  selector: 'app-client-details',
  imports: [
    InvoiceCard,
    ClientCard,
  ],
  templateUrl: './client-details.html',
  styleUrl: './client-details.scss',
})
export class ClientDetails {
  readonly clientData = input<ClientDetailsDTO | undefined>(undefined);
}

