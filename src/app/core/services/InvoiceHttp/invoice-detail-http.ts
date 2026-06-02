import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InvoiceDetail} from '../../Interfaces/InvoiceDetailDTO';
import {environment} from '../../../../environments/environment.development';
import {ApiResponse} from '../../Interfaces/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class InvoiceDetailHttp {
  private http = inject(HttpClient);
  get(id:string){
    return this.http.get<ApiResponse<InvoiceDetail>>(`${environment.apiUrl}/invoice/detail/${id}`);
  }
}

