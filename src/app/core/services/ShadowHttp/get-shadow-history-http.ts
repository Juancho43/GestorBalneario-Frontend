import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ShadowDetailsDTO} from '../../Interfaces/Details/ShadowDetailsDTO';
import {ApiResponse} from '../../Interfaces/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class GetShadowHistoryHttp {
  private http = inject(HttpClient);

  get(id:string){
    return this.http.get<ApiResponse<ShadowDetailsDTO>>(`${environment.apiUrl}/shadow/history/${id}`);
  }
}
