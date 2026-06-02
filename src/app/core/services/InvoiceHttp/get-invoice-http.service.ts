import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {InvoiceEntity} from '../../model/InvoiceEntity';
import {ApiResponse} from '../../Interfaces/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class GetInvoiceHttp {

  private http = inject(HttpClient);

  get(id: string) {
    return this.http.get<ApiResponse<InvoiceEntity>>(`${environment.apiUrl}/invoice/get/${id}`);
  }
}
