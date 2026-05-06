import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {SeasonManager} from '../Managers/season-manager';
import {SeasonServicesDTO} from '../../DTO/SeasonServicesDTO';
import {ApiResponse} from '../../DTO/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class GetServicesHttp {
  private http = inject(HttpClient);

  private currentSeason = inject(SeasonManager);
  private season = this.currentSeason.currentSeason;
  get(){
    let id = this.season().id!;
    let page = 0;
    let size = 10;
    return this.http.get<ApiResponse<SeasonServicesDTO>>(`${environment.apiUrl}/service/season/${id}?page=${page}&size=${size}`);
  }
}
