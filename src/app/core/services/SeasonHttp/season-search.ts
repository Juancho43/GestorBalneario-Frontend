import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../Interfaces/ApiResponse';
import {environment} from '../../../../environments/environment.development';
import {SeasonEntity} from '../../model/SeasonEntity';
import {SearchQuery} from '../../Interfaces/SearchInterfaces';

@Injectable({
  providedIn: 'root',
})
export class SeasonSearch {
  private http = inject(HttpClient);
  execute(query: SearchQuery) {
    const params = new URLSearchParams({
      query: query.search.query?.trim() || '',
      page: query.pagination.page.toString(),
      limit: query.pagination.limit.toString(),
      orderBy: query.search.filters.orderBy!.trim() || 'created_at',
      direction: query.search.filters.orderDirection! || 'asc'
    });
    const url = `${environment.apiUrl}/season/search?${params.toString()}`;
    return this.http.get<ApiResponse<SeasonEntity[]>>(url);
  }

}
