import {inject, Injectable, linkedSignal, signal} from '@angular/core';
import {GetInvoicesHttp} from '../InvoiceHttp/get-invoices-http.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {PaginatedQuery} from '../ClientHttp/get-clients-http';

@Injectable({
  providedIn: 'root',
})
export class InvoiceManager {

  private listHttp = inject(GetInvoicesHttp);
  private query = signal({query:'IssuedState',page:0,pageSize:10})
  private invoicesResource= rxResource({
    params:() => this.query(),
    stream:({params})=> this.listHttp.get(params)
  })

  /*
  * A list of the current shadows. It is updated when a shadow is added, updated or deleted.
  * */
  private invoices = linkedSignal(()=>
    this.invoicesResource.isLoading() || this.invoicesResource.error() ? [] : this.invoicesResource.value()!.data!
  )
  setQuery(query: PaginatedQuery) {
    this.query.set(query);
  }
  getQuery(): PaginatedQuery {
    return this.query();
  }
  currentInvoice = signal<string>('')

  getList(){
    return this.invoices();
  }
}
