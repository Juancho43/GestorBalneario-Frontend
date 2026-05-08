import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {PaginatedQuery} from '../ClientHttp/get-clients-http';
import {ReservationEntity} from '../../model/reservationEntity';
import {ApiResponse} from '../../DTO/ApiResponse';
import {SeasonManager} from '../Managers/season-manager';

@Injectable({
  providedIn: 'root',
})
export class GetAllReservationsHttp{
  private http = inject(HttpClient);
  private currentSeason = inject(SeasonManager);
  private season = this.currentSeason.currentSeason;
  get(query: PaginatedQuery){
    let id = this.season().id!;
    let page = query.page;
    let size = query.pageSize;
    return this.http.get<ApiResponse<ReservationEntity[]>>(`${environment.apiUrl}/reservation/season/${id}?page=${page}&size=${size}`);
  }

}
