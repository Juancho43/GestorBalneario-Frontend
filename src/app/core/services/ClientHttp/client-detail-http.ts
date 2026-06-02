import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ClientDetailDTO} from '../../Interfaces/ClientDetailDTO';
import {ApiResponse} from '../../Interfaces/ApiResponse';

@Injectable({
  providedIn: 'root',
})

export class ClientDetailHttp {
  private http = inject(HttpClient);

    get(id:string, page:number, limit:number){
    return this.http.get<ApiResponse<ClientDetailDTO>>(`${environment.apiUrl}/client/detail/${id}?page=${page}&pageSize=${limit}`);
  }
}
