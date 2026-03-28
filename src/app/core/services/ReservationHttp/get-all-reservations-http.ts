import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {PaginatedQuery} from '../ClientHttp/get-clients-http';
import {ReservationEntity} from '../../model/reservationEntity';

@Injectable({
  providedIn: 'root',
})
export class GetAllReservationsHttp {
  private http = inject(HttpClient);
  get(query: PaginatedQuery){
    return this.http.get<ReservationEntity[]>(`${environment.apiUrl}/reservation/current?page=${query.page}&size=${query.pageSize}`);
  }
}
