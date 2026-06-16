import {computed, inject, Injectable} from '@angular/core';
import {SeasonManager} from '../Managers/season-manager';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../Interfaces/ApiResponse';
import {environment} from '../../../../environments/environment.development';
import {ShadowEntity} from '../../model/shadowEntity';
import {SearchQuery} from '../../Interfaces/SearchInterfaces';

@Injectable({
  providedIn: 'root',
})
export class ShadowSearch {
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
      state: query.search.filters.state!.trim() || 'All',
      type: query.search.filters.type!.trim() || 'All',
      direction: query.search.filters.orderDirection!
    });

    const url = `${environment.apiUrl}/shadow/search?${params.toString()}`;
    return this.http.get<ApiResponse<ShadowEntity[]>>(url);
  }
}
