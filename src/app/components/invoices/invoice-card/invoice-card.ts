import {Component, input} from '@angular/core';
import {InvoiceEntity} from '../../../core/model/InvoiceEntity';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {MatCard} from '@angular/material/card';
import {InvoiceStatePipe} from '../../../core/utils/pipes/invoice-state-pipe';

@Component({
  selector: 'app-invoice-card',
  imports: [
    MatCard,
    DatePipe,
    CurrencyPipe,
    InvoiceStatePipe,
  ],
  templateUrl: './invoice-card.html',
  styleUrl: './invoice-card.scss',
})
export class InvoiceCard {
  readonly invoice = input.required<InvoiceEntity>();

}
