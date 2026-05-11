import {Component, computed, inject, signal} from '@angular/core';
import {PaymentsReportHttp} from '../../../core/services/PaymentHttp/payments-report-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {ReportQuery} from '../../../core/DTO/ReportQuery';
import {ReportForm} from '../../payments/report-form/report-form';
import {Dialog} from '@angular/cdk/dialog';
import {InvoiceDetails} from '../../invoices/invoice-details/invoice-details';
import {InvoiceManager} from '../../../core/services/Managers/invoice-manager.service';
import {PaymentsTable} from '../../payments/payments-table/payments-table';
import {ReportResponse} from '../../../core/DTO/ReportResponse';
import {Paginator} from '../../paginator/paginator';
import {PaymentEntity} from '../../../core/model/paymentEntity';
import {PaymentManager} from '../../../core/services/Managers/payment-manager';

@Component({
  selector: 'app-payment-viewer',
  imports: [
    ReportForm,
    PaymentsTable,
    Paginator,
  ],
  templateUrl: './payment-viewer.html',
  styleUrl: './payment-viewer.scss',
})
export class PaymentViewer {
  private reportsService = inject(PaymentsReportHttp);
  private invoiceManager = inject(InvoiceManager);
  private paymentManager = inject(PaymentManager)
  private dialog = inject(Dialog);
  protected paymentMethods = this.paymentManager.paymentMethods;
  query = signal<ReportQuery>({
    page:0,
    limit:10,
    type: 'ALL',
    start: new Date(new Date().setHours(0, 0, 0, 0)).toISOString().split('T')[0],
    end: new Date(new Date().setHours(23, 59, 59, 999)).toISOString().split('T')[0],

  });
  reportResource = rxResource({
    params : () =>{
      return {
        query : this.query(),
      }
    },
    stream: ({params}) => this.reportsService.generate(params.query)
  })
  report = computed(()=> {
      if(!this.reportResource.error() && !this.reportResource.isLoading()){
         return this.reportResource.value()!.data;
      }else{
        return {
          payments : [],
          total : 0,
        } as ReportResponse
      }
    }
  )
  protected openInvoiceDialog(payment: PaymentEntity) {
    this.invoiceManager.currentInvoice.set(payment.invoiceId!);
    this.dialog.open(InvoiceDetails)
  }
}
