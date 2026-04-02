import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServiceEntity} from '../../model/serviceEntity';
import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CreateServiceHttp {
  private http = inject(HttpClient);
  execute(payload: ServiceEntity) {
    return this.http.post(`${environment.apiUrl}/service/create`, payload);
  }
}
