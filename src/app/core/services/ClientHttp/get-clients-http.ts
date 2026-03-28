import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ClientEntity} from '../../model/clientEntity';

export interface PaginatedQuery {
  page: number;
  pageSize: number;
  query: string;
}
@Injectable({
  providedIn: 'root',
})
export class GetClientsHttp {

  private http = inject(HttpClient);

  get(query: PaginatedQuery){
    return this.http.get<ClientEntity[]>(`${environment.apiUrl}/client/current?page=${query.page}&size=${query.pageSize}`);
  }
}
