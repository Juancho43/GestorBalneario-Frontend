import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {PaginatedQuery} from '../ClientHttp/get-clients-http';
import {InvoiceEntity} from '../../model/InvoiceEntity';
import {SeasonManager} from "../Managers/season-manager";
import {ApiResponse} from '../../Interfaces/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class GetInvoicesHttp {
  private http = inject(HttpClient);
  private currentSeason = inject(SeasonManager);
  private season = this.currentSeason.currentSeason;
  get(query: PaginatedQuery) {

    return this.http.get<ApiResponse<InvoiceEntity[]>>(`${environment.apiUrl}/invoice/season/${this.season().id!}?page=${query.page}&size=${query.pageSize}&state=${query.query}`);
  }
}
