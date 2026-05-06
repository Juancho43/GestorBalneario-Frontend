import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {ServiceEntity} from '../../model/serviceEntity';
import {environment} from '../../../../environments/environment.development';
import {USE_SEASON_HEADER} from '../../utils/current-season/UseSeasonHeader';
import {ApiResponse} from '../../DTO/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class CreateServiceHttp {
  private http = inject(HttpClient);
  execute(payload: ServiceEntity) {
    return this.http.post<ApiResponse<ServiceEntity>>(`${environment.apiUrl}/service/create`, payload,
      {
        context: new HttpContext().set(USE_SEASON_HEADER,true)
      }
    );
  }
}
