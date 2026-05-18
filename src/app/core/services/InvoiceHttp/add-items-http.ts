import {inject, Injectable} from '@angular/core';
import {ApiResponse} from '../../DTO/ApiResponse';
import {InvoiceEntity} from '../../model/InvoiceEntity';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AddItemsHttp {
  private http = inject(HttpClient);

  execute(payload: any ){
      return this.http.post<ApiResponse<InvoiceEntity>>(`${environment.apiUrl}/invoice/item/add`,payload);
  }
}
