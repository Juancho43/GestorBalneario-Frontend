import {Component, input, linkedSignal, output} from '@angular/core';
import {PaymentEntity} from '../../../core/model/paymentEntity';
import {form, FormField} from '@angular/forms/signals';
import {InvoiceEntity} from '../../../core/model/InvoiceEntity';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  imports: [
    FormField,
    FormsModule
  ],
  templateUrl: './payment-form.html',
  styleUrl: './payment-form.scss',
})
export class PaymentForm {
  readonly paymentToEdit = input<PaymentEntity>();
  invoice = input.required<InvoiceEntity>()
  payment = linkedSignal(() => this.paymentToEdit() || {
    amount: 1,
    changeType:1,
    type:'CASH',
    description:"Pago",
    currency:'ARS',
    date: new Date(),
    invoiceId: this.invoice()?.id ?? ''
  } as PaymentEntity);
  paymentForm = form(this.payment, (schemaPath)=>{

  })

  finalPayment = output<PaymentEntity>();



  protected submitPayment() {
    this.finalPayment.emit(this.payment());
  }
}
