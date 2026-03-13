import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShadowEntity} from '../../model/shadowEntity';
import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CreateShadowHttp {
  private http = inject(HttpClient);

  create(shadow: ShadowEntity) {
    return this.http.post<ShadowEntity>(`${environment.apiUrl}/shadow/create`, shadow);
  }
}
