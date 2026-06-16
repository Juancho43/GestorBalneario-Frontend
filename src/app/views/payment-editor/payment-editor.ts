import {Component, computed, effect, inject, linkedSignal} from '@angular/core';
import {InvoiceManager} from '../../core/services/Managers/invoice-manager.service';
import {PaymentForm} from '../../components/payments/payment-form/payment-form';
import {PaymentEntity} from '../../core/model/paymentEntity';
import {CreatePaymentHttp} from '../../core/services/PaymentHttp/create-payment-http';
import {InvoiceEntity} from '../../core/model/InvoiceEntity';
import {PaymentManager} from '../../core/services/Managers/payment-manager';

@Component({
  selector: 'app-payment-editor',
  imports: [
    PaymentForm
  ],
  templateUrl: './payment-editor.html',
  styleUrl: './payment-editor.scss',
})
export default class PaymentEditor {
  private createPaymentHttp = inject(CreatePaymentHttp);
  private invoiceManager= inject(InvoiceManager);
  private paymentManager = inject(PaymentManager);
  paymentMethods = computed(()=>this.paymentManager.paymentMethods())
  // invoices = computed(()=>this.invoiceManager.getList())
  selectedInvoice = linkedSignal(()=>{return {}as InvoiceEntity})


  constructor() {
    // this.invoiceManager.setQuery({query:'IssuedState',page:0,pageSize:10})
    effect(() => {
      // if (this.invoices()) {
      //   this.selectedInvoice.set(this.invoiceManager.getList()![0] || {} as InvoiceEntity);
      // }
    });
  }

  protected createPayment($event: PaymentEntity) {
    this.createPaymentHttp.create($event).subscribe();
  }
}
