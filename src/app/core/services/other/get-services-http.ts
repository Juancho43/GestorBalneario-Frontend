import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ServiceEntity} from '../../model/serviceEntity';

@Injectable({
  providedIn: 'root',
})
export class GetServicesHttp {
  private http = inject(HttpClient);

  get(){
    return this.http.get<ServiceEntity[]>(`${environment.apiUrl}/service/current`);
  }
}
