import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SeasonEntity} from '../../model/SeasonEntity';
import {environment} from '../../../../environments/environment.development';
import {ApiResponse} from '../../Interfaces/ApiResponse';

export interface CloneSeasonCommand {
  oldSeasonId: string;
  newSeason:SeasonEntity;
}
@Injectable({
  providedIn: 'root',
})
export class CreateSeasonHttp {
  private http = inject(HttpClient);
  execute(season: SeasonEntity) {
    return this.http.post<ApiResponse<SeasonEntity>>(`${environment.apiUrl}/season/create`, season)
  }
  clone(command: CloneSeasonCommand) {
    return this.http.post<ApiResponse<null>>(`${environment.apiUrl}/season/clone`, command)
  }
}
