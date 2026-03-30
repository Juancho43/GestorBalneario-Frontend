import {inject, Injectable, linkedSignal, signal} from '@angular/core';
import {GetInvoicesHttp} from '../InvoiceHttp/get-invoices-http.service';
import {rxResource} from '@angular/core/rxjs-interop';
import {InvoiceEntity} from '../../model/InvoiceEntity';

@Injectable({
  providedIn: 'root',
})
export class InvoiceListManager {

  private listHttp = inject(GetInvoicesHttp);

  private invoicesResource= rxResource({
    stream:()=> this.listHttp.get({query:'',page:0,pageSize:10})
  })

  /*
  * A list of the current shadows. It is updated when a shadow is added, updated or deleted.
  * */
  private invoices = linkedSignal(()=>
    this.invoicesResource.isLoading() || this.invoicesResource.error() ? [] : this.invoicesResource.value()!
  )
  currentInvoice = signal<string>('')

  getList(){
    return this.invoices();
  }
}
