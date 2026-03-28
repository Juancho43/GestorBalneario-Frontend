import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {PaginatedQuery} from '../ClientHttp/get-clients-http';
import {InvoiceEntity} from '../../model/InvoiceEntity';

@Injectable({
  providedIn: 'root',
})
export class GetInvoicesHttp {
  private http = inject(HttpClient);

  get(query: PaginatedQuery) {
    return this.http.get<InvoiceEntity[]>(`${environment.apiUrl}/invoice/current?page=${query.page}&size=${query.pageSize}`);

  }
}
