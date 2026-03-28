import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ShadowMapDTO} from '../../DTO/ShadowMapDTO';
import {rxResource} from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ShadowMapHttp {
  private http = inject(HttpClient);

  get(){
    return this.http.get<ShadowMapDTO>(`${environment.apiUrl}/shadow/map`);
  }

}
