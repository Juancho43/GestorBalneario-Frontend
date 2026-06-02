import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ShadowHistory} from '../../Interfaces/ShadowHistory';
import {ApiResponse} from '../../Interfaces/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class GetShadowHistoryHttp {
  private http = inject(HttpClient);

  get(id:string){
    return this.http.get<ApiResponse<ShadowHistory>>(`${environment.apiUrl}/shadow/history/${id}`);
  }
}
