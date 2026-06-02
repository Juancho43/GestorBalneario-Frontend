import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {ServiceEntity} from '../../model/serviceEntity';
import {ApiResponse} from '../../Interfaces/ApiResponse';
import {environment} from '../../../../environments/environment.development';
import {USE_SEASON_HEADER} from '../../utils/interceptors/UseSeasonHeader';

@Injectable({
  providedIn: 'root',
})
export class EditServiceHttp {
  private http= inject(HttpClient);
  execute(service: ServiceEntity){
    return this.http.put<ApiResponse<ServiceEntity>>(`${environment.apiUrl}/service/update`, {id: service.id, data:service},
      {
        context: new HttpContext().set(USE_SEASON_HEADER,true)
      }
    );
  }
}
