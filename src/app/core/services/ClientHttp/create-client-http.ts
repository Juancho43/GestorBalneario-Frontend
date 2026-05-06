import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ClientEntity} from '../../model/clientEntity';
import {ApiResponse} from '../../DTO/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class CreateClientHttp {
  private http = inject(HttpClient);
  create(data: ClientEntity) {
    return this.http.post<ApiResponse<ClientEntity>>(`${environment.apiUrl}/client/create`, data);
  }
}
