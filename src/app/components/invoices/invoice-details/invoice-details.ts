import {Component, computed, inject} from '@angular/core';
import {InvoiceDetailHttp} from '../../../core/services/InvoiceHttp/invoice-detail-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {InvoiceManager} from '../../../core/services/Managers/invoice-manager.service';
import {DatePipe} from '@angular/common';
import {ItemsTable} from '../items-table/items-table';
import {PaymentsTable} from '../../payments/payments-table/payments-table';
import {InvoiceStatePipe} from '../../../core/utils/pipes/invoice-state-pipe';

@Component({
  selector: 'app-invoice-details',
  imports: [
    DatePipe,
    ItemsTable,
    InvoiceStatePipe,
    PaymentsTable
  ],
  templateUrl: './invoice-details.html',
  styleUrl: './invoice-details.scss',
})
export class InvoiceDetails {
  private manager = inject(InvoiceManager);
  invoice = computed(()=>this.manager.invoice())

}
