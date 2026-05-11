import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {ShadowEntity} from '../../model/shadowEntity';
import {environment} from '../../../../environments/environment.development';
import {USE_SEASON_HEADER} from '../../utils/interceptors/UseSeasonHeader';
import {ApiResponse} from '../../DTO/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class CreateShadowHttp {
  private http = inject(HttpClient);

  create(shadow: ShadowEntity) {
    return this.http.post<ApiResponse<ShadowEntity>>(`${environment.apiUrl}/shadow/create`, shadow,
      {
        context: new HttpContext().set(USE_SEASON_HEADER,true)
      }
    );
  }
}
