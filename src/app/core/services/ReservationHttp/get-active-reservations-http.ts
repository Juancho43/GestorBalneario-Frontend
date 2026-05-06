import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReservationEntity} from '../../model/reservationEntity';
import {environment} from '../../../../environments/environment.development';
import {ApiResponse} from '../../DTO/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class GetActiveReservationsHttp {
  private http = inject(HttpClient);

  get(){
    return this.http.get<ApiResponse<ReservationEntity[]>>(`${environment.apiUrl}/reservation/active`);
  }
}
