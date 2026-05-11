import {Component, computed, inject, linkedSignal} from '@angular/core';
import {InvoiceCard} from "../../invoices/invoice-card/invoice-card";
import {Dialog} from '@angular/cdk/dialog';
import {InvoiceManager} from '../../../core/services/Managers/invoice-manager.service';
import {InvoiceAdjustment} from '../../invoices/invoice-adjustment/invoice-adjustment';
import {InvoiceAdjustmentForm} from '../../Invoices/invoice-adjustment-form/invoice-adjustment-form';

@Component({
  selector: 'app-invoice-editor',
  imports: [
    InvoiceCard,
    InvoiceAdjustment
  ],
  templateUrl: './invoice-editor.html',
  styleUrl: './invoice-editor.scss',
})
export class InvoiceEditor {
  private dialog = inject(Dialog);
  private manager = inject(InvoiceManager);
  protected invoices = computed(()=>this.manager.getList());
  protected query = linkedSignal(()=> this.manager.getQuery());

  invoice = linkedSignal(()=>this.manager.invoice())

  constructor() {
    this.query.set({query:'ALL',page:0,pageSize:10})
    this.manager.setQuery(this.query());
  }

  protected selectInvoice(invoice: any) {
    this.manager.currentInvoice.set(invoice.id!);
  }

  protected openAdjustmentDialog() {
    this.dialog.open(InvoiceAdjustmentForm)
  }
}
