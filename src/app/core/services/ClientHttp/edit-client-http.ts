import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShadowEntity} from '../../model/shadowEntity';
import {environment} from '../../../../environments/environment.development';
import {ClientEntity} from '../../model/clientEntity';

@Injectable({
  providedIn: 'root',
})
export class EditClientHttp {
  private http = inject(HttpClient);

  update(data: ClientEntity) {
    return this.http.put<ClientEntity>(`${environment.apiUrl}/client/update`, {id: data.id, data:data});
  }
}
