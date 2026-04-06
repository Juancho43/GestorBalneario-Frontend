import {Component, computed, effect, inject} from '@angular/core';
import {ClientDetailHttp} from '../../../core/services/ClientHttp/client-detail-http';
import {ClientListManager} from '../../../core/services/Managers/client-list-manager';
import {rxResource} from '@angular/core/rxjs-interop';
import {ClientDetailDTO} from '../../../core/DTO/ClientDetailDTO';
import {InvoiceCard} from '../../invoices/invoice-card/invoice-card';
import {InvoiceDetails} from '../../invoices/invoice-details/invoice-details';
import {InvoiceListManager} from '../../../core/services/Managers/invoice-list-manager';
import {InvoiceEntity} from '../../../core/model/InvoiceEntity';

@Component({
  selector: 'app-client-details',
  imports: [
    InvoiceCard,
    InvoiceDetails,
  ],
  templateUrl: './client-details.html',
  styleUrl: './client-details.scss',
})
export class ClientDetails {

  private invoiceManager = inject(InvoiceListManager);
  private query = inject(ClientDetailHttp);
  private manager = inject(ClientListManager);
  clientResource = rxResource({
    stream: () => this.query.get(this.manager.currentClient()?.id!, 0,10)
  })
  client = computed(() => {
    if(!this.clientResource.isLoading() && !this.clientResource.error()){
      return this.clientResource.value()!;
    }
    return {} as ClientDetailDTO;
  })

  protected selectInvoice(invoice: InvoiceEntity) {
    this.invoiceManager.currentInvoice.set(invoice.id!);
  }

  constructor() {
    effect(() => {
      if(this.client().client !== undefined){
        this.selectInvoice(this.client().invoices[0]);
      }
    });
  }
}

