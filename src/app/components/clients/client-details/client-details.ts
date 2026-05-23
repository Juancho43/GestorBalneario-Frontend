import {Component, computed, effect, inject, OnDestroy} from '@angular/core';
import {ClientDetailHttp} from '../../../core/services/ClientHttp/client-detail-http';
import {ClientManager} from '../../../core/services/Managers/client-manager.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {InvoiceCard} from '../../invoices/invoice-card/invoice-card';
import {InvoiceDetails} from '../../invoices/invoice-details/invoice-details';
import {InvoiceManager} from '../../../core/services/Managers/invoice-manager.service';
import {ClientDetailDTO} from '../../../core/DTO/ClientDetailDTO';
import {ClientEntity} from '../../../core/model/clientEntity';

@Component({
  selector: 'app-client-details',
  imports: [
    InvoiceCard,
    InvoiceDetails,
  ],
  templateUrl: './client-details.html',
  styleUrl: './client-details.scss',
})
export class ClientDetails implements OnDestroy {
  private manager = inject(ClientManager);
  private invoiceManager = inject(InvoiceManager);
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

  ngOnDestroy(): void {
    this.invoiceManager.currentInvoice.set('');
  }

}

