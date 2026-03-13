import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ShadowEntity} from '../../model/shadowEntity';

@Injectable({
  providedIn: 'root',
})
export class GetShadowHttp {
  private http = inject(HttpClient);

  get(id: string) {
    return this.http.get<ShadowEntity>(`${environment.apiUrl}/shadow/get/${id}`);
  }
}
