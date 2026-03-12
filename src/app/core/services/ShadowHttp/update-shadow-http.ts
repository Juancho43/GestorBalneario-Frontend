import {inject, Injectable} from '@angular/core';
import {ShadowEntity} from '../../model/shadowEntity';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UpdateShadowHttp {
  private http = inject(HttpClient);

  update(shadow: ShadowEntity) {
      return this.http.put<ShadowEntity>(`${environment.apiUrl}/shadow/update`, {id: shadow.id, data:shadow});
  }
}
