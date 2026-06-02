import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {PaginatedQuery} from '../ClientHttp/get-clients-http';
import {ReservationEntity} from '../../model/reservationEntity';
import {ApiResponse} from '../../Interfaces/ApiResponse';
import {SeasonManager} from '../Managers/season-manager';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAllReservationsHttp{
  private http = inject(HttpClient);
  private currentSeason = inject(SeasonManager);
  private season = this.currentSeason.currentSeason;
  get(query: PaginatedQuery){
    const currentSeason = this.season();

    if (!currentSeason || !currentSeason.id) {
      return throwError(() => new Error('La temporada aún no está cargada.'));
    }
    let page = query.page;
    let size = query.pageSize;
    return this.http.get<ApiResponse<ReservationEntity[]>>(`${environment.apiUrl}/reservation/season/${currentSeason.id}?page=${page}&size=${size}`);
  }
}
