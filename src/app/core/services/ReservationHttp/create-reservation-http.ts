import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ReservationEntity} from '../../model/reservationEntity';
import {USE_SEASON_HEADER} from '../../utils/interceptors/UseSeasonHeader';
import {ApiResponse} from '../../Interfaces/ApiResponse';

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
    return this.http.post<ApiResponse<ReservationEntity>>(`${environment.apiUrl}/reservation/create`, payload,
      {
        context: new HttpContext().set(USE_SEASON_HEADER,true)
      }
      );
  }
}
