import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ShadowHistory} from '../../DTO/ShadowHistory';

@Injectable({
  providedIn: 'root',
})
export class GetShadowHistoryHttp {
  private http = inject(HttpClient);

  get(id:string){
    return this.http.get<ShadowHistory>(`${environment.apiUrl}/shadow/history/${id}`);
  }
}
