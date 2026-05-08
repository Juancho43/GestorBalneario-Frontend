import {Component, computed, effect, inject} from '@angular/core';
import {ClientDetailHttp} from '../../../core/services/ClientHttp/client-detail-http';
import {ClientManager} from '../../../core/services/Managers/client-manager.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {InvoiceCard} from '../../invoices/invoice-card/invoice-card';
import {InvoiceDetails} from '../../invoices/invoice-details/invoice-details';
import {InvoiceListManager} from '../../../core/services/Managers/invoice-list-manager';
import {ClientDetailDTO} from '../../../core/DTO/ClientDetailDTO';
import {ClientEntity} from '../../../core/model/clientEntity';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-client-details',
  imports: [
    InvoiceCard,
    InvoiceDetails,
  ],
  templateUrl: './client-details.html',
  styleUrl: './client-details.scss',
})
export class ClientDetails{
  private manager = inject(ClientManager);
  private invoiceManager = inject(InvoiceListManager);
  private query = inject(ClientDetailHttp);
  clientResource = rxResource({
    params: () => {
      return {
        id: this.manager.currentClient()!.id!,
        page: 0,
        pageSize: 10,
      }
    },
    stream: ({params}) => this.query.get(params.id,params.page,params.pageSize)
  })
  client = computed(() => {
    if(!this.clientResource.isLoading() && !this.clientResource.error()){
      return this.clientResource.value()?.data!;
    }

    return {
      client: {} as ClientEntity,
      invoices: []
    } as ClientDetailDTO;
  })

  protected selectInvoice(id: string ) {
    this.invoiceManager.currentInvoice.set(id);
  }

  constructor() {
    effect(() => {
      if(this.client()!.client !== undefined && this.client()!.invoices.length > 0){
        this.selectInvoice(this.client()!.invoices[0].id!);
      }
    });
  }
}

