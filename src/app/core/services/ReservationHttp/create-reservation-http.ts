import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClientEntity} from '../../model/clientEntity';
import {environment} from '../../../../environments/environment.development';
import {ReservationEntity} from '../../model/reservationEntity';

@Injectable({
  providedIn: 'root',
})
export class CreateReservationHttp {

  private http = inject(HttpClient);
  create(data: ReservationEntity) {
    return this.http.post<ReservationEntity>(`${environment.apiUrl}/reservation/create`, data);
  }
}
