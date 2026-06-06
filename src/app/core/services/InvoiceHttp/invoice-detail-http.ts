import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ApiResponse} from '../../Interfaces/ApiResponse';
import {InvoiceDetailsDTO} from '../../Interfaces/Details/InvoiceDetailDTO';

@Injectable({
  providedIn: 'root',
})
export class InvoiceDetailHttp {
  private http = inject(HttpClient);
  get(id:string){
    return this.http.get<ApiResponse<InvoiceDetailsDTO>>(`${environment.apiUrl}/invoice/detail/${id}`);
  }
}

