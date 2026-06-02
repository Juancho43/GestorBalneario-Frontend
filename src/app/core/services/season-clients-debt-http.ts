import {computed, inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../Interfaces/ApiResponse';
import {SeasonManager} from './Managers/season-manager';
import {environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SeasonClientsDebtHttp {
  private http = inject(HttpClient);
  private seasonManager = inject(SeasonManager);
  private currentSeason = computed(()=> this.seasonManager.currentSeason())
  execute() {
    const seasonId = this.currentSeason().id!
    return this.http.get<ApiResponse<number>>(`${environment.apiUrl}/season/clients-debt?seasonId=${seasonId}`,);
  }
}
