import {Component, computed, input, linkedSignal, output} from '@angular/core';
import {PaymentEntity} from '../../../core/model/paymentEntity';
import {form, FormField, min, required} from '@angular/forms/signals';
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
  editMode = linkedSignal(() => !!this.paymentToEdit());
  paymentForm = form(this.payment, (schemaPath)=>{
    min(schemaPath.amount,1,{message:'El monto debe ser mayor a 0'})
    min(schemaPath.changeType,1,{message:'El monto del tipo de cambio debe ser mayor a 0'})
    required(schemaPath.amount,{message: 'El monto es requerido'})
    required(schemaPath.changeType,{message:'El tipo de cambio es requerido'})
    required(schemaPath.date,{message:'La fecha es requerida'})
    required(schemaPath.invoiceId!, {message:'El pago debe estar asociado a una factura'})
  })

  allFormErrors = computed(() => {
    const root = this.paymentForm().errors() || [];
    const amount = this.paymentForm.amount().errors() || [];
    const changeType = this.paymentForm.changeType().errors() || [];
    const date = this.paymentForm.date().errors() || [];
    const invoice = this.paymentForm.invoiceId!().errors() || [];
    return [...root, ...amount, ...changeType, ...date, ...invoice];

  });

  finalPayment = output<PaymentEntity>();

  protected submitPayment() {
    if(!this.paymentForm().invalid()){
      this.finalPayment.emit(this.payment());
      this.editMode.set(false)
    }
  }
}
