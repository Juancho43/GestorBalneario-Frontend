import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ReservationEntity} from '../../model/reservationEntity';
import {ApiResponse} from '../../DTO/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class GetReservationHttp {

  private http = inject(HttpClient);

  get(id: string) {
    return this.http.get<ApiResponse<ReservationEntity>>(`${environment.apiUrl}/reservation/get/${id}`);
  }
}
