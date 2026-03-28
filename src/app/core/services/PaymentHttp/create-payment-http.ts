import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PaymentEntity} from '../../model/paymentEntity';
import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CreatePaymentHttp {
  private http = inject(HttpClient);

  create(payment: PaymentEntity){
    return this.http.post(`${environment.apiUrl}/payment/create`, payment);
  }
}

