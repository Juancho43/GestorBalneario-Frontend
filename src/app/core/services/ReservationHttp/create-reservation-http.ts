import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ReservationEntity} from '../../model/reservationEntity';
import {USE_SEASON_HEADER} from '../../../current-season/UseSeasonHeader';

@Injectable({
  providedIn: 'root',
})
export class CreateReservationHttp {

  private http = inject(HttpClient);
  create(data: ReservationEntity) {
    const payload = {
      clientId: data.client!.id,
      shadowId: data.shadow!.id!,
      checkIn: data.dates.checkIn.toString(),
      checkOut: data.dates.checkOut.toString(),
      price: data.price,
      serviceId: data.serviceId
    }
    return this.http.post<ReservationEntity>(`${environment.apiUrl}/reservation/create`, payload,
      {
        context: new HttpContext().set(USE_SEASON_HEADER,true)
      }
      );
  }
}
