import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ClientEntity} from '../../model/clientEntity';

export interface GetClientsQuery {
  page: number;
  pageSize: number;
  query: string;
}
@Injectable({
  providedIn: 'root',
})
export class GetClientsHttp {

  private http = inject(HttpClient);

  get(query: GetClientsQuery){
    return this.http.post<ClientEntity[]>(`${environment.apiUrl}/client/current`,query);
  }
}
