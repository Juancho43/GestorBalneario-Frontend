import {inject, Injectable} from '@angular/core';
import {ApiResponse} from '../../Interfaces/ApiResponse';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GetPaymentMethods {
  private http = inject(HttpClient);

  execute(){
      return this.http.get<ApiResponse<string[]>>(`${environment.apiUrl}/payment/methods `);
  }
}
