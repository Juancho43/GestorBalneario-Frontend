import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ApiResponse} from '../../DTO/ApiResponse';
import {SeasonEntity} from '../../model/SeasonEntity';

@Injectable({
  providedIn: 'root',
})
export class EditSeasonHttp{
  private http = inject(HttpClient);

  update(data: SeasonEntity) {
    return this.http.put<ApiResponse<SeasonEntity>>(`${environment.apiUrl}/season/update`, {id: data.id, data:data});
  }
}
