import {computed, inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ShadowMapDTO} from '../../Interfaces/ShadowMapDTO';
import {SeasonManager} from '../Managers/season-manager';
import {ApiResponse} from '../../Interfaces/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class ShadowMapHttp {
  private http = inject(HttpClient);
  private currentSeason = inject(SeasonManager);
  private season =computed(()=> this.currentSeason.currentSeason());
  get(){
    let seasonId = this.chooseSeason();
    return this.http.get<ApiResponse<ShadowMapDTO>>(`${environment.apiUrl}/shadow/map?seasonId=${seasonId}`)
  }
  chooseSeason(){
    let seasonId = 'none';
    if (this.season()!.id){
      seasonId = this.season()!.id!;
    }
    return seasonId;
  }
}
