import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {PaymentEntity} from '../../model/paymentEntity';
import {environment} from '../../../../environments/environment.development';
import {USE_SEASON_HEADER} from '../../utils/current-season/UseSeasonHeader';
import {ApiResponse} from '../../DTO/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class CreatePaymentHttp {
  private http = inject(HttpClient);

  create(payment: PaymentEntity){
    return this.http.post<ApiResponse<PaymentEntity>>(`${environment.apiUrl}/payment/create`, payment,
      {
        context: new HttpContext().set(USE_SEASON_HEADER,true)
      }
      );
  }
}

