import {computed, inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../Interfaces/ApiResponse';
import {environment} from '../../../../environments/environment.development';
import {InvoiceEntity} from '../../model/InvoiceEntity';
import {SeasonManager} from '../Managers/season-manager';
import {SearchQuery} from '../../Interfaces/SearchInterfaces';

@Injectable({
  providedIn: 'root',
})
export class InvoiceSearch {
  private currentSeason = inject(SeasonManager);
  private season =computed(()=> this.currentSeason.currentSeason());
  private http = inject(HttpClient);

  execute(query: SearchQuery) {

    const seasonId = this.season()!.id!;
    const params = new URLSearchParams({
      query: query.search.query?.trim() || '',
      page: query.pagination.page.toString(),
      limit: query.pagination.limit.toString(),
      seasonId: seasonId,
      orderBy: query.search.filters.orderBy!.trim() || 'i.created_at',
      direction: query.search.filters.orderDirection! || 'asc',
      state: query.search.filters.state! || 'All'
    });
    const url = `${environment.apiUrl}/invoice/search?${params.toString()}`;
    return this.http.get<ApiResponse<InvoiceEntity[]>>(url);
  }

}
