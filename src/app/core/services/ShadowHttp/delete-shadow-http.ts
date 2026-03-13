import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class DeleteShadowHttp {
  private http = inject(HttpClient);

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/shadow/delete/${id}`);
  }
}
