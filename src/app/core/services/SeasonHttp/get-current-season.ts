import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {SeasonEntity} from '../../model/SeasonEntity';

@Injectable({
  providedIn: 'root',
})
export class GetCurrentSeason {
  private http = inject(HttpClient);

  get() {
    return this.http.get<SeasonEntity>(`${environment.apiUrl}/season/active`);
  }
}
