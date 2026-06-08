import {Component, input} from '@angular/core';
import {InvoiceEntity} from '../../../core/model/InvoiceEntity';
import {CurrencyPipe, DatePipe, NgClass} from '@angular/common';
import {InvoiceStatePipe} from '../../../core/utils/pipes/invoice-state-pipe';
import {MatIcon} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {Card} from '../../layout/card/card';

@Component({
  selector: 'app-invoice-card',
  imports: [
    DatePipe,
    CurrencyPipe,
    InvoiceStatePipe,
    NgClass,
    MatIcon,
    RouterLink,
    Card,
  ],
  templateUrl: './invoice-card.html',
  styleUrl: './invoice-card.scss',
})
export class InvoiceCard {
  readonly invoice = input.required<InvoiceEntity>();
}
