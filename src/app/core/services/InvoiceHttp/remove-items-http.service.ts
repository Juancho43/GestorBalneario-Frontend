import {inject, Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../Interfaces/ApiResponse';
import {InvoiceEntity} from '../../model/InvoiceEntity';

export interface DeleteInvoiceItemCommand {
  itemId: string;
  invoiceId: string;
}
@Injectable({
  providedIn: 'root',
})
export class RemoveItemsHttp {
  private http = inject(HttpClient);

  execute(payload: DeleteInvoiceItemCommand) {
      return this.http.put<ApiResponse<InvoiceEntity>>(`${environment.apiUrl}/invoice/item/remove`,payload);
  }
}
