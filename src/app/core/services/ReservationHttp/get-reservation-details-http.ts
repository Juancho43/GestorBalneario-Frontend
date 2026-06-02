import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReservationDetailDTO} from '../../Interfaces/ReservationDetailDTO';
import {environment} from '../../../../environments/environment.development';
import {ApiResponse} from '../../Interfaces/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class GetReservationDetailsHttp {
  private http = inject(HttpClient);
  get(id:string){
    return this.http.get<ApiResponse<ReservationDetailDTO>>(`${environment.apiUrl}/reservation/detail/${id}`);
  }
}
