import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ClientEntity} from '../../model/clientEntity';

@Injectable({
  providedIn: 'root',
})
export class CreateClientHttp {
  private http = inject(HttpClient);
  create(data: ClientEntity) {
    return this.http.post<ClientEntity>(`${environment.apiUrl}/client/create`, data);
  }
}
