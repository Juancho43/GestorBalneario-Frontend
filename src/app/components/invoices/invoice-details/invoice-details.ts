import {Component, input} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {ItemsTable} from '../items-table/items-table';
import {PaymentsTable} from '../../payments/payments-table/payments-table';
import {ClientCard} from '../../clients/client-card/client-card';
import {InvoiceCard} from '../invoice-card/invoice-card';
import {InvoiceDetailsDTO} from '../../../core/Interfaces/Details/InvoiceDetailDTO';

@Component({
  selector: 'app-invoice-details',
  imports: [
    ItemsTable,
    PaymentsTable,
    JsonPipe,
    ClientCard,
    InvoiceCard
  ],
  templateUrl: './invoice-details.html',
  styleUrl: './invoice-details.scss',
})
export class InvoiceDetails {
  readonly invoiceData = input<InvoiceDetailsDTO | undefined>(undefined);
}
