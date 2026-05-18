import {inject, Injectable, linkedSignal} from '@angular/core';
import {AddItemsHttp} from '../InvoiceHttp/add-items-http';
import {UpdateItemsHttp} from '../InvoiceHttp/update-items-http';
import {DeleteInvoiceItemCommand, RemoveItemsHttp} from '../InvoiceHttp/remove-items-http.service';
import {InvoiceItem} from '../../model/invoiceItemEntity';
import {InvoiceManager} from './invoice-manager.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceItemsManager {
  private invoiceManager = inject(InvoiceManager);
  private createHttp = inject(AddItemsHttp);
  private updateHttp = inject(UpdateItemsHttp);
  private deleteHttp = inject(RemoveItemsHttp);

  currentItems = linkedSignal(()=> this.invoiceManager.invoice()?.items || []);

  addItem(item:InvoiceItem){
    this.createHttp.execute(item).subscribe(
      r =>this.invoiceManager.invoiceResource.reload()
    );
  }
  updateItem(item:InvoiceItem){
    this.updateHttp.execute(item).subscribe(
      r => this.invoiceManager.invoiceResource.reload()
    );
  }
  deleteItem(item:DeleteInvoiceItemCommand){
    this.deleteHttp.execute(item).subscribe(
      r => this.invoiceManager.invoiceResource.reload()
    );
  }
}
