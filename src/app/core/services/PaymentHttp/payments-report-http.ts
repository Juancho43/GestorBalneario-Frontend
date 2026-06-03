import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment.development';
import {ReportQuery} from '../../Interfaces/ReportQuery';
import {ReportResponse} from '../../Interfaces/ReportResponse';
import {ApiResponse} from '../../Interfaces/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class PaymentsReportHttp {
  private http = inject(HttpClient);
  generate(query: ReportQuery){
    const startDate = query.start.toISOString().split('T')[0];
    const endDate = query.end.toISOString().split('T')[0];

    const params = new URLSearchParams({
      method:query.type,
      start:startDate,
      end:endDate,
      page: query.page.toString(),
      size: query.limit.toString()
    });
    const url = `${environment.apiUrl}/payment/report?${params.toString()}`;
    return this.http.get<ApiResponse<ReportResponse>>(url);
  }
}
