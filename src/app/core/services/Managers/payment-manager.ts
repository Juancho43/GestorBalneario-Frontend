import {inject, Injectable, signal} from '@angular/core';
import {CreatePaymentHttp} from '../PaymentHttp/create-payment-http';
import {PaymentsReportHttp} from '../PaymentHttp/payments-report-http';
import {PaymentEntity} from '../../model/paymentEntity';

@Injectable({
  providedIn: 'root',
})
export class PaymentManager {
  private createHttp = inject(CreatePaymentHttp);
  private getHttp = null;
  private updateHttp = null;
  private deleteHttp = null;



  currentPayment = signal<string|null>(null);




  createPayment(payment: PaymentEntity) {
    this.createHttp.create(payment).subscribe(r =>{})
  }
  updatePayment(payment: PaymentEntity) {

  }
  deletePayment(payment: PaymentEntity) {

  }

}
