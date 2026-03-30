import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {InvoiceDetail} from '../../DTO/InvoiceDetailDTO';
import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class InvoiceDetailHttp {
  private http = inject(HttpClient);
  get(id:string){
    return this.http.get<InvoiceDetail>(`${environment.apiUrl}/invoice/detail/${id}`);
  }
}

