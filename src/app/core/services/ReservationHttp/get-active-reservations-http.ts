import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReservationEntity} from '../../model/reservationEntity';
import {environment} from '../../../../environments/environment.development';
import {ApiResponse} from '../../Interfaces/ApiResponse';
import {PaginatedQuery} from '../ClientHttp/get-clients-http';

@Injectable({
  providedIn: 'root',
})
export class GetActiveReservationsHttp {
  private http = inject(HttpClient);

  get(query: PaginatedQuery){
    return this.http.get<ApiResponse<ReservationEntity[]>>(`${environment.apiUrl}/reservation/active?page=${query.page}&size=${query.pageSize}`);
  }
}
