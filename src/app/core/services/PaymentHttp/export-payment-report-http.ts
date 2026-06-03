import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ReportQuery} from '../../Interfaces/ReportQuery';
import {environment} from '../../../../environments/environment.development';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExportPaymentReportHttp {
  private http = inject(HttpClient);
  generate(query: ReportQuery,format: string) : Observable<any>{
    const startDate = query.start.toISOString().split('T')[0];
    const endDate = query.end.toISOString().split('T')[0];
    const params = new URLSearchParams({
      format: format,
      method:query.type,
      startDate:startDate,
      endDate:endDate,
      page: query.page.toString(),
      size: query.limit.toString()
    });
    const url = `${environment.apiUrl}/export-payment-report?${params.toString()}`;

    if (format === 'CSV') {
      return this.http.get(url, { responseType: 'blob' });
    }

    if (format === 'Imprimir' || format === 'print') {
      return this.http.get(url, { responseType: 'text' });
    }

    return this.http.get(url, { responseType: 'json' });
  }
}
