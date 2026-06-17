import {inject, Injectable} from '@angular/core';
import {ApiResponse} from '../../Interfaces/ApiResponse';
import {HttpClient} from '@angular/common/http';
import {SeasonDetailsDTO} from '../../Interfaces/Details/SeasonDetailsDTO';
import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SeasonDetailsHttp {
  private http = inject(HttpClient);

  execute(id: string){
      return this.http.get<ApiResponse<SeasonDetailsDTO>>(`${environment.apiUrl}/seasons/details/${id}`);
  }
}
