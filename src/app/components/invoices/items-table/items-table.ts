import {Component, input} from '@angular/core';
import {CurrencyPipe, DatePipe} from "@angular/common";
import {InvoiceDetail} from '../../../core/DTO/InvoiceDetailDTO';

@Component({
  selector: 'app-items-table',
    imports: [
        CurrencyPipe,
        DatePipe
    ],
  templateUrl: './items-table.html',
  styleUrl: './items-table.scss',
})
export class ItemsTable {
  readonly invoice = input<InvoiceDetail>();
}
