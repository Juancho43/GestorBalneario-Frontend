import {computed, inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../Interfaces/ApiResponse';
import {SeasonManager} from '../Managers/season-manager';
import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SeasonClientsDebtHttp {
  private http = inject(HttpClient);
  private currentSeason = inject(SeasonManager);
  private season =computed(()=> this.currentSeason.currentSeason());
  execute() {
    const seasonId = this.season()!.id!;
    return this.http.get<ApiResponse<number>>(`${environment.apiUrl}/season/clients-debt?seasonId=${seasonId}`,);
  }
}
