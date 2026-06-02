import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ClientEntity} from '../../model/clientEntity';
import {ApiResponse} from '../../Interfaces/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class EditClientHttp {
  private http = inject(HttpClient);

  update(data: ClientEntity) {
    return this.http.put<ApiResponse<ClientEntity>>(`${environment.apiUrl}/client/update`, {id: data.id, data:data});
  }
}
