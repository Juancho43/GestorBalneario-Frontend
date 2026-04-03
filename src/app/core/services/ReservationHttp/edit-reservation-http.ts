import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ReservationEntity} from '../../model/reservationEntity';
import {USE_SEASON_HEADER} from '../../../current-season/UseSeasonHeader';

@Injectable({
  providedIn: 'root',
})
export class EditReservationHttp {
  private http = inject(HttpClient);

  update(data: ReservationEntity) {
    return this.http.put<ReservationEntity>(`${environment.apiUrl}/reservation/update`, {id: data.id, data:data},
      {
        context: new HttpContext().set(USE_SEASON_HEADER,true)
      }
      );
  }
}
