import {Component, input} from '@angular/core';
import {InvoiceEntity} from '../../../core/model/InvoiceEntity';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-invoice-card',
  imports: [
    JsonPipe
  ],
  templateUrl: './invoice-card.html',
  styleUrl: './invoice-card.scss',
})
export class InvoiceCard {
  readonly invoice = input.required<InvoiceEntity>();

}
