import {Component, computed, effect, inject, linkedSignal} from '@angular/core';
import {InvoiceListManager} from '../../../core/services/Managers/invoice-list-manager';
import {InvoiceCard} from '../../invoices/invoice-card/invoice-card';
import {PaymentForm} from '../payment-form/payment-form';
import {PaymentEntity} from '../../../core/model/paymentEntity';
import {CreatePaymentHttp} from '../../../core/services/PaymentHttp/create-payment-http';
import {InvoiceEntity} from '../../../core/model/InvoiceEntity';

@Component({
  selector: 'app-payment-editor',
  imports: [
    InvoiceCard,
    PaymentForm
  ],
  templateUrl: './payment-editor.html',
  styleUrl: './payment-editor.scss',
})
export default class PaymentEditor {
  private createPaymentHttp = inject(CreatePaymentHttp);
  private invoiceManager= inject(InvoiceListManager);
  invoices = computed(()=>this.invoiceManager.getList())
  selectedInvoice = linkedSignal(()=>{return {}as InvoiceEntity})


  constructor() {
    effect(() => {
      if (this.invoices()) {
        this.selectedInvoice.set(this.invoiceManager.getList()[0] || {} as InvoiceEntity);
      }
    });
  }

  protected createPayment($event: PaymentEntity) {
    console.log($event)
    this.createPaymentHttp.create($event).subscribe();
  }
}
