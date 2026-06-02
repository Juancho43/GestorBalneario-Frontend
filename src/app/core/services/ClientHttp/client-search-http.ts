import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClientEntity} from '../../model/clientEntity';
import {environment} from '../../../../environments/environment.development';
import {ApiResponse} from "../../Interfaces/ApiResponse";
import {SearchQuery} from '../../Interfaces/SearchInterfaces';

@Injectable({
  providedIn: 'root',
})
export class ClientSearchHttp {
  private http = inject(HttpClient);
  execute(query: SearchQuery) {

    const params = new URLSearchParams({
      query: query.search.query?.trim() || '',
      page: query.pagination.page.toString(),
      limit: query.pagination.limit.toString(),
      orderBy: query.search.filters.orderBy!.trim() || 'name',
      direction: query.search.filters.orderDirection!
    });

    const url = `${environment.apiUrl}/client/search?${params.toString()}`;
    return this.http.get<ApiResponse<ClientEntity[]>>(url);
  }
}
