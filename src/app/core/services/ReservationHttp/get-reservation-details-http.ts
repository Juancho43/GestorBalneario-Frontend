import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReservationDetailsDTO} from '../../Interfaces/Details/ReservationDetailsDTO';
import {environment} from '../../../../environments/environment.development';
import {ApiResponse} from '../../Interfaces/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class GetReservationDetailsHttp {
  private http = inject(HttpClient);
  get(id:string){
    return this.http.get<ApiResponse<ReservationDetailsDTO>>(`${environment.apiUrl}/reservation/detail/${id}`);
  }
}
