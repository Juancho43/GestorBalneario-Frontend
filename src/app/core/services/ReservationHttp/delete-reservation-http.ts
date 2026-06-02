import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ApiResponse} from '../../Interfaces/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class DeleteReservationHttp {
  private http = inject(HttpClient);

  delete(id: string) {
    return this.http.delete<ApiResponse<null>>(`${environment.apiUrl}/reservation/delete/${id}`);
  }
}
