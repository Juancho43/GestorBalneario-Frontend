import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ClientEntity} from '../../model/clientEntity';

@Injectable({
  providedIn: 'root',
})
export class GetClientHttp {

  private http = inject(HttpClient);

  get(id: string) {
    return this.http.get<ClientEntity>(`${environment.apiUrl}/client/get/${id}`);
  }
}
