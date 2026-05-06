import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {SeasonEntity} from '../../model/SeasonEntity';
import {ApiResponse} from '../../DTO/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class GetSeasonsHttp {
  private http = inject(HttpClient);
  get(){
    return this.http.get<ApiResponse<SeasonEntity[]>>(`${environment.apiUrl}/season/history`);
  }
}
