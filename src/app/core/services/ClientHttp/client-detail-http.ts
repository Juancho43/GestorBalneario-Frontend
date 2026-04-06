import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ClientDetailDTO} from '../../DTO/ClientDetailDTO';

@Injectable({
  providedIn: 'root',
})

export class ClientDetailHttp {
  private http = inject(HttpClient);
  get(id:string, page:number, limit:number){
    return this.http.get<ClientDetailDTO>(`${environment.apiUrl}/client/detail/${id}?page=${page}&limit=${limit}`);
  }
}
