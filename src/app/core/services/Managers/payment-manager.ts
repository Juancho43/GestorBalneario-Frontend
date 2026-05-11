import {computed, inject, Injectable, signal} from '@angular/core';
import {CreatePaymentHttp} from '../PaymentHttp/create-payment-http';
import {PaymentEntity} from '../../model/paymentEntity';
import {GetPaymentMethods} from '../PaymentHttp/get-payment-methods';
import {rxResource} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class PaymentManager {
  private createHttp = inject(CreatePaymentHttp);
  private methodsHttp = inject(GetPaymentMethods);
  private getHttp = null;
  private updateHttp = null;
  private deleteHttp = null;


  private paymentMethodsResource = rxResource({
    stream:() => this.methodsHttp.execute()
  })
  paymentMethods = computed(() =>
    this.paymentMethodsResource.isLoading() && this.paymentMethodsResource.error() ? [] : this.paymentMethodsResource.value()?.data!
  )
  currentPayment = signal<string|null>(null);




  createPayment(payment: PaymentEntity) {
    this.createHttp.create(payment).subscribe(r =>{})
  }
  updatePayment(payment: PaymentEntity) {

  }
  deletePayment(payment: PaymentEntity) {

  }

}
