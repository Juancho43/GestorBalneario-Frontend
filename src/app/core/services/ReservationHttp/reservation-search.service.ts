import {computed, inject, Injectable} from '@angular/core';
import {SeasonManager} from '../Managers/season-manager';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../Interfaces/ApiResponse';
import {environment} from '../../../../environments/environment.development';
import {ReservationEntity} from '../../model/reservationEntity';
import {SearchQuery} from '../../Interfaces/SearchInterfaces';

@Injectable({
  providedIn: 'root',
})
export class ReservationSearch {
  private currentSeason = inject(SeasonManager);
  private season = computed(()=> this.currentSeason.currentSeason());
  private http = inject(HttpClient);
  execute(query: SearchQuery) {
    const seasonId = this.season()!.id!;
    const params = new URLSearchParams({
      query: query.search.query?.trim() || '',
      page: query.pagination.page.toString(),
      seasonId: seasonId,
      limit: query.pagination.limit.toString(),
      state: query.search.filters.state!.trim() || 'All',
      direction: query.search.filters.orderDirection!
    });

    const url = `${environment.apiUrl}/reservation/search?${params.toString()}`;
    return this.http.get<ApiResponse<ReservationEntity[]>>(url);
  }

}
