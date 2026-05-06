import {Component, computed, inject} from '@angular/core';
import {InvoiceDetailHttp} from '../../../core/services/InvoiceHttp/invoice-detail-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {InvoiceListManager} from '../../../core/services/Managers/invoice-list-manager';
import {DatePipe} from '@angular/common';
import {ItemsTable} from '../items-table/items-table';
import {PaymentsTable} from '../../payments/payments-table/payments-table';
import {InvoiceStatePipe} from '../../../core/utils/invoice-state-pipe';
import {InvoiceDetail} from '../../../core/DTO/InvoiceDetailDTO';

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
  private query = inject(InvoiceDetailHttp);
  private manager = inject(InvoiceListManager);
  invoiceResource = rxResource({
    params : () => {return {id:this.manager.currentInvoice()}},
    stream : ({params}) => this.query.get(params.id)
  })
  invoice = computed(()=>
  {
      return this.invoiceResource.value()?.data!;
  })
}
