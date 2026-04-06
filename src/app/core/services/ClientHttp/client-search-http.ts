import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClientEntity} from '../../model/clientEntity';
import {environment} from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ClientSearchHttp {
  private http = inject(HttpClient);
  execute(query: string,page:number,limit:number) {
    return this.http.get<ClientEntity[]>(`${environment.apiUrl}/client/search?query=${query}&page=${page}&limit=${limit}`);
  }
}
