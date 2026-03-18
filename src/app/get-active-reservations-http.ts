import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PaginatedQuery} from './core/services/ClientHttp/get-clients-http';
import {ReservationEntity} from './core/model/reservationEntity';
import {environment} from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GetActiveReservationsHttp {
  private http = inject(HttpClient);

  get(){
    return this.http.get<ReservationEntity[]>(`${environment.apiUrl}/reservation/active`);
  }
}
