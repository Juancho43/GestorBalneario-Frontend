import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SeasonEntity} from '../../model/SeasonEntity';
import {environment} from '../../../../environments/environment.development';
import {ApiResponse} from '../../Interfaces/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class SetActiveSeasonHttp {
  private http = inject(HttpClient);
  execute(payload: SeasonEntity) {
    return this.http.put<ApiResponse<SeasonEntity>>(`${environment.apiUrl}/season/activate`,{seasonId: payload.id!});
  }
}
