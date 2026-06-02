import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShadowEntity} from '../../model/shadowEntity';
import {environment} from '../../../../environments/environment.development';
import {ApiResponse} from "../../Interfaces/ApiResponse";

@Injectable({
  providedIn: 'root',
})
export class GetCurrentShadowsHttp {
  private http = inject(HttpClient);

  getCurrent() {
    return this.http.get<ApiResponse<ShadowEntity[]>>(`${environment.apiUrl}/shadow/current`);
  }
}
