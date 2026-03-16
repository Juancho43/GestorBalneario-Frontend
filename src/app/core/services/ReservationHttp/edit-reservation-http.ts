import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClientEntity} from '../../model/clientEntity';
import {environment} from '../../../../environments/environment.development';
import {ReservationEntity} from '../../model/reservationEntity';

@Injectable({
  providedIn: 'root',
})
export class EditReservationHttp {
  private http = inject(HttpClient);

  update(data: ReservationEntity) {
    return this.http.put<ReservationEntity>(`${environment.apiUrl}/reservation/update`, {id: data.id, data:data});
  }
}
