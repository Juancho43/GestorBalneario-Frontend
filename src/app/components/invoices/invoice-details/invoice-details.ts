import {Component, computed, inject} from '@angular/core';
import {InvoiceDetailHttp} from '../../../core/services/InvoiceHttp/invoice-detail-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {InvoiceListManager} from '../../../core/services/Managers/invoice-list-manager';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-invoice-details',
  imports: [
    JsonPipe
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
  invoice = computed(()=>this.invoiceResource.value())
}
