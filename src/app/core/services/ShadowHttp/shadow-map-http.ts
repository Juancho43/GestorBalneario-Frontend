import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ShadowMapDTO} from '../../DTO/ShadowMapDTO';
import {SeasonManager} from '../Managers/season-manager';

@Injectable({
  providedIn: 'root',
})
export class ShadowMapHttp {
  private http = inject(HttpClient);
  private currentSeason = inject(SeasonManager);
  private season = this.currentSeason.currentSeason;
  get(){
    return this.http.get<ShadowMapDTO>(`${environment.apiUrl}/shadow/map?seasonId=${this.season().id}`);
  }

}
