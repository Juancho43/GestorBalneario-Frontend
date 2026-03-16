import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClientEntity} from '../../model/clientEntity';
import {environment} from '../../../../environments/environment.development';
import {ReservationEntity} from '../../model/reservationEntity';

@Injectable({
  providedIn: 'root',
})
export class GetReservationHttp {

  private http = inject(HttpClient);

  get(id: string) {
    return this.http.get<ReservationEntity>(`${environment.apiUrl}/reservation/get/${id}`);
  }
}
