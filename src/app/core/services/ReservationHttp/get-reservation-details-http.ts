import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReservationDetailDTO} from '../../DTO/ReservationDetailDTO';
import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GetReservationDetailsHttp {
  private http = inject(HttpClient);
  get(id:string){
    return this.http.get<ReservationDetailDTO>(`${environment.apiUrl}/reservation/detail/${id}`);
  }
}
