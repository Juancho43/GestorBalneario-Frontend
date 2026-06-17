import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../Interfaces/ApiResponse';
import {environment} from '../../../../environments/environment.development';
import {ServiceDetailsDTO} from '../../Interfaces/Details/ServiceDetailsDTO';

@Injectable({
  providedIn: 'root',
})
export class ServiceDetailsHttp {
  private http = inject(HttpClient);

  execute(id: string){
    return this.http.get<ApiResponse<ServiceDetailsDTO>>(`${environment.apiUrl}/services/details/${id}`);
  }
}
