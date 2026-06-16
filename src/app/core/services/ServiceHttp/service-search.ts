import {computed, inject, Injectable} from '@angular/core';
import {SeasonManager} from '../Managers/season-manager';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../Interfaces/ApiResponse';
import {environment} from '../../../../environments/environment.development';
import {ServiceEntity} from '../../model/serviceEntity';
import {SearchQuery} from '../../Interfaces/SearchInterfaces';

@Injectable({
  providedIn: 'root',
})
export class ServiceSearch {
  private currentSeason = inject(SeasonManager);
  private season =computed(()=> this.currentSeason.currentSeason());
  private http = inject(HttpClient);
  execute(query: SearchQuery) {
    const seasonId = this.season()!.id!;

    const params = new URLSearchParams({
      query: query.search.query?.trim() || '',
      page: query.pagination.page.toString(),
      limit: query.pagination.limit.toString(),
      type: query.search.filters.type!.trim() || 'All',
      seasonId: seasonId,
      orderBy: query.search.filters.orderBy!.trim() || 'created_at',
      direction: query.search.filters.orderDirection! || 'asc'
    });
    const url = `${environment.apiUrl}/service/search?${params.toString()}`;
    return this.http.get<ApiResponse<ServiceEntity[]>>(url);
  }
}
