import {Component, input} from '@angular/core';
import {ItemsTable} from '../items-table/items-table';
import {InvoiceDetail} from '../../../core/DTO/InvoiceDetailDTO';

@Component({
  selector: 'app-invoice-adjustment',
  imports: [
    ItemsTable
  ],
  templateUrl: './invoice-adjustment.html',
  styleUrl: './invoice-adjustment.scss',
})
export class InvoiceAdjustment {
  readonly invoiceToAdjust = input<InvoiceDetail>();

}
