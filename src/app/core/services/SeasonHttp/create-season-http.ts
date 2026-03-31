import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SeasonEntity} from '../../model/SeasonEntity';
import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CreateSeasonHttp {
  private http = inject(HttpClient);

  execute(season: SeasonEntity) {
    return this.http.post(`${environment.apiUrl}/season/create`, season)
  }
}
