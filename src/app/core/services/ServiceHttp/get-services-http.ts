import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {SeasonManager} from '../Managers/season-manager';
import {SeasonServicesDTO} from '../../DTO/SeasonServicesDTO';
import {ApiResponse} from '../../DTO/ApiResponse';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetServicesHttp {
  private http = inject(HttpClient);

  private currentSeason = inject(SeasonManager);
  private season = this.currentSeason.currentSeason;
  get(type:string = 'ALL'){
    const currentSeason = this.season();

    // The Guard Clause: If there is no season yet, stop execution safely.
    if (!currentSeason || !currentSeason.id) {
      return throwError(() => new Error('La temporada aún no está cargada.'));
    }

    let id: string = currentSeason.id;
    let page: number = 0;
    let size: number = 10;

    return this.http.get<ApiResponse<SeasonServicesDTO>>(
      `${environment.apiUrl}/service/season/${id}?page=${page}&size=${size}&type=${type}`
    );
  }
}
