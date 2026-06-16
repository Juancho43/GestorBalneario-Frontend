import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PaginatedQuery} from '../ClientHttp/get-clients-http';
import {SeasonManager} from "../Managers/season-manager";

@Injectable({
  providedIn: 'root',
})
export class GetInvoicesHttp {
  private http = inject(HttpClient);
  private currentSeason = inject(SeasonManager);
  private season = this.currentSeason.currentSeason;
  get(query: PaginatedQuery) {

    // return this.http.get<ApiResponse<InvoiceEntity[]>>(`${environment.apiUrl}/invoice/season/${this.season().id!}?page=${query.page}&size=${query.pageSize}&state=${query.query}`);
  }
}
