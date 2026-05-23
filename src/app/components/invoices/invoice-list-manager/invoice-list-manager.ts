import {Component, computed, inject, linkedSignal} from '@angular/core';
import {InvoiceList} from '../invoice-list/invoice-list';
import {Dialog} from '@angular/cdk/dialog';
import {InvoiceManager} from '../../../core/services/Managers/invoice-manager.service';
import {InvoiceEntity} from '../../../core/model/InvoiceEntity';
import {InvoiceDetails} from '../invoice-details/invoice-details';

@Component({
  selector: 'app-invoice-list-manager',
  imports: [
    InvoiceList
  ],
  templateUrl: './invoice-list-manager.html',
  styleUrl: './invoice-list-manager.scss',
})
export class InvoiceListManager {
  private dialog = inject(Dialog);
  private manager = inject(InvoiceManager);
  protected invoices = computed(()=>this.manager.getList());
  protected query = linkedSignal(()=> this.manager.getQuery());
  constructor() {
    this.query.set({query:'ALL',page:0,pageSize:10})
    this.manager.setQuery(this.query());
  }

  protected openInvoiceDialog(invoice: InvoiceEntity) {
    this.manager.currentInvoice.set(invoice.id!);
    this.dialog.open(InvoiceDetails)
  }
}
