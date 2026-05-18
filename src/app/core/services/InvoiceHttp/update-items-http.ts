import {inject, Injectable} from '@angular/core';
import {ApiResponse} from '../../DTO/ApiResponse';
import {HttpClient} from '@angular/common/http';
import {InvoiceEntity} from '../../model/InvoiceEntity';
import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UpdateItemsHttp {
  private http = inject(HttpClient);

  execute(payload: any){
      return this.http.put<ApiResponse<InvoiceEntity>>(`${environment.apiUrl}/invoice/item/update`, payload);
  }
}
