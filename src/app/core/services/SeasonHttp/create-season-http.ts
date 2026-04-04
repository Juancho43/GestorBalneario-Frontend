import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SeasonEntity} from '../../model/SeasonEntity';
import {environment} from '../../../../environments/environment.development';
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
    return this.http.post(`${environment.apiUrl}/season/create`, season)
  }
  clone(command: CloneSeasonCommand) {
    return this.http.post(`${environment.apiUrl}/season/clone`, command)
  }
}
