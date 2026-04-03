import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpContext} from '@angular/common/http';
import {ShadowEntity} from '../../model/shadowEntity';
import {environment} from '../../../../environments/environment.development';
import {USE_SEASON_HEADER} from '../../../current-season/UseSeasonHeader';

@Injectable({
  providedIn: 'root',
})
export class CreateShadowHttp {
  private http = inject(HttpClient);

  create(shadow: ShadowEntity) {
    return this.http.post<ShadowEntity>(`${environment.apiUrl}/shadow/create`, shadow,
      {
        context: new HttpContext().set(USE_SEASON_HEADER,true)
      }
      );
  }
}
