import {Component, computed, inject} from '@angular/core';
import {PaymentForm} from '../payment-form/payment-form';
import {PaymentManager} from '../../../core/services/Managers/payment-manager';
import {InvoiceManager} from '../../../core/services/Managers/invoice-manager.service';
import {PaymentEntity} from '../../../core/model/paymentEntity';

@Component({
  selector: 'app-new-payment-dialog',
  imports: [
    PaymentForm,
  ],
  templateUrl: './new-payment-side-sheet.component.html',
  styleUrl: './new-payment-side-sheet.component.scss',
})
export class NewPaymentSideSheet {
  private manager = inject(PaymentManager);
  private invoiceManager = inject(InvoiceManager);
  protected invoice = computed(()=> this.invoiceManager.currentInvoiceDetails()?.invoice);
  protected paymentMethods = computed(()=>this.manager.paymentMethods())

  protected handleSubmit($event: PaymentEntity) {
    this.manager.createPayment($event);
  }

}
