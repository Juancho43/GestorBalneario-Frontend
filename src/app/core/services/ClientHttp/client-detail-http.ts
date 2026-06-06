import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ClientDetailsDTO} from '../../Interfaces/Details/ClientDetailsDTO';
import {ApiResponse} from '../../Interfaces/ApiResponse';

@Injectable({
  providedIn: 'root',
})

export class ClientDetailHttp {
  private http = inject(HttpClient);

    get(id:string, page:number, limit:number){
    return this.http.get<ApiResponse<ClientDetailsDTO>>(`${environment.apiUrl}/client/detail/${id}?page=${page}&pageSize=${limit}`);
  }
}
