import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ReportQuery} from '../../DTO/ReportQuery';
import {ReportResponse} from '../../DTO/ReportResponse';

@Injectable({
  providedIn: 'root',
})
export class PaymentsReportHttp {
  private http = inject(HttpClient);
  generate(query: ReportQuery){
    const url = `${environment.apiUrl}/payment/report?start=${query.start}&end=${query.end}&method=${query.type}&page=${query.page}&size${query.limit}`
    return this.http.get<ReportResponse>(url);
  }
}
