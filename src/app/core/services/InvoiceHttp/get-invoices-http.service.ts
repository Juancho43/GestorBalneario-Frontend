import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {PaginatedQuery} from '../ClientHttp/get-clients-http';
import {InvoiceEntity} from '../../model/InvoiceEntity';
import { SeasonManager } from "../Managers/season-manager";

@Injectable({
  providedIn: 'root',
})
export class GetInvoicesHttp {
  private http = inject(HttpClient);
  private currentSeason = inject(SeasonManager);
  get(query: PaginatedQuery) {
    let id = this.currentSeason.season().id!;
    return this.http.get<InvoiceEntity[]>(`${environment.apiUrl}/invoice/season/${id}?page=${query.page}&size=${query.pageSize}`);

  }
}
