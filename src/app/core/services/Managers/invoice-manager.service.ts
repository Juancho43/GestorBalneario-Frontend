import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {rxResource} from '@angular/core/rxjs-interop';
import {InvoiceDetailHttp} from '../InvoiceHttp/invoice-detail-http';
import {SearchQuery} from '../../Interfaces/SearchInterfaces';
import {InvoiceSearch} from '../InvoiceHttp/invoice-search';
import {InvoiceDetailsDTO} from '../../Interfaces/Details/InvoiceDetailDTO';
import {emptySearchQuery} from '../other/const';

@Injectable({
  providedIn: 'root',
})
export class InvoiceManager {
  private searchHttp = inject(InvoiceSearch)
  private getDetailsHttp = inject(InvoiceDetailHttp);
  searchQuery = signal<SearchQuery>({
      ...emptySearchQuery,
      search:{
        query:'',
        filters:{
          orderBy: 'i.created_at'
        }
      }
    }
  )
  searchResource = rxResource({
    params: () => this.searchQuery(),
    stream:({params}) => this.searchHttp.execute(params)
  })
  invoicesToDisplay = computed(()=>{
    return this.searchResource.isLoading() || this.searchResource.error() ? [] : this.searchResource.value()?.data!
  })


  selectedInvoiceId = signal<string | null>(null);
  currentInvoiceDetails = signal<InvoiceDetailsDTO | undefined>(undefined);

  public invoiceResource = rxResource({
    params: () => {
      const id = this.selectedInvoiceId();
      return id ? { id } : undefined;
    },
    stream: ({params}) => this.getDetailsHttp.get(params.id)
  });
  invoice = computed(()=>
  {
    return this.invoiceResource.value()?.data!;
  })

  constructor() {
    effect(() => {
      this.selectedInvoiceId();
      this.getInvoiceDetails();
    });
  }
  getInvoiceDetails(){
    if(this.selectedInvoiceId()){
      const id = this.selectedInvoiceId()!;
      this.getDetailsHttp.get(id). subscribe(
        {
          next: (r) => {
            if(r.data) this.currentInvoiceDetails.set(r.data)
          }
        }
      )
    }
  }
}
