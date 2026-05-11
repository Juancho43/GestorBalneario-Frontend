import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../DTO/ApiResponse';
import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GetServiceTypesHttp {
  private http = inject(HttpClient);

  execute() {
      return this.http.get<ApiResponse<string[]>>(`${environment.apiUrl}/service/types`);
  }
}
