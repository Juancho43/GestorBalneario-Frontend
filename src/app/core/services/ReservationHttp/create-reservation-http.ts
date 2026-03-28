import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ReservationEntity} from '../../model/reservationEntity';

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
    return this.http.post<ReservationEntity>(`${environment.apiUrl}/reservation/create`, payload);
  }
}
