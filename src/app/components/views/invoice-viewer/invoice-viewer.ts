import {Component, computed, inject, linkedSignal} from '@angular/core';
import {InvoiceManager} from '../../../core/services/Managers/invoice-manager.service';
import {InvoiceCard} from '../../invoices/invoice-card/invoice-card';
import {PaymentEntity} from '../../../core/model/paymentEntity';
import {InvoiceDetails} from '../../invoices/invoice-details/invoice-details';
import {InvoiceEntity} from '../../../core/model/InvoiceEntity';
import {Dialog} from '@angular/cdk/dialog';

@Component({
  selector: 'app-invoice-viewer',
  imports: [
    InvoiceCard
  ],
  templateUrl: './invoice-viewer.html',
  styleUrl: './invoice-viewer.scss',
})
export class InvoiceViewer {
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
