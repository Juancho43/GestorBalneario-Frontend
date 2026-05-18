import {Component, computed, input, output} from '@angular/core';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {InvoiceItem} from '../../../core/model/invoiceItemEntity';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-invoice-adjustment',
  imports: [
    CurrencyPipe,
    DatePipe,
    MatIcon
  ],
  templateUrl: './invoice-adjustment.html',
  styleUrl: './invoice-adjustment.scss',
})
export class InvoiceAdjustment {
  readonly items = input<InvoiceItem[]>([]);
  protected total = computed(()=>{
    return this.items().reduce((acc, item) => acc + item.price, 0);
  })
  editItem = output<InvoiceItem>()
  deleteItem = output<InvoiceItem>()

}
