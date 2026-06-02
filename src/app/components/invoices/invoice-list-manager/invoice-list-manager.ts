import {Component, computed, inject} from '@angular/core';
import {InvoiceList} from '../invoice-list/invoice-list';
import {InvoiceManager} from '../../../core/services/Managers/invoice-manager.service';
import {InvoiceSearcher} from '../invoice-searcher/invoice-searcher';
import {Paginator} from '../../layout/paginator/paginator';
import {SearchBarData} from '../../../core/Interfaces/SearchInterfaces';

@Component({
  selector: 'app-invoice-list-manager',
  imports: [
    InvoiceList,
    InvoiceSearcher,
    Paginator,
  ],
  templateUrl: './invoice-list-manager.html',
  styleUrl: './invoice-list-manager.scss',
})
export class InvoiceListManager {
  private manager = inject(InvoiceManager);
  protected invoices = computed(()=>this.manager.invoicesToDisplay());
  protected query = computed(()=>this.manager.searchQuery().pagination)

  protected handleSearch($event: SearchBarData) {
    this.manager.searchQuery.update((p) => ({
      ...p,
      search: $event
    }))
  }

  protected handlePage($event:number) {
    this.manager.searchQuery.update((p) => ({
      ...p,
      pagination:{
        page: $event,
        limit:10
      }
    }))
  }
}
