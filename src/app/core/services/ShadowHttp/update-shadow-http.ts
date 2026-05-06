import {inject, Injectable} from '@angular/core';
import {ShadowEntity} from '../../model/shadowEntity';
import {HttpClient, HttpContext} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {USE_SEASON_HEADER} from '../../utils/current-season/UseSeasonHeader';
import { ApiResponse } from "../../DTO/ApiResponse";

@Injectable({
  providedIn: 'root',
})
export class UpdateShadowHttp {
  private http = inject(HttpClient);

  update(shadow: ShadowEntity) {
    return this.http.put<ApiResponse<ShadowEntity>>(`${environment.apiUrl}/shadow/update`, {id: shadow.id, data:shadow},
      {
        context: new HttpContext().set(USE_SEASON_HEADER,true)
      }
    );
  }
}
