import {Component, computed, inject, signal} from '@angular/core';
import {PaymentsReportHttp} from '../../../core/services/PaymentHttp/payments-report-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {ReportQuery} from '../../../core/DTO/ReportQuery';
import {ReportForm} from '../report-form/report-form';
import {JsonPipe} from '@angular/common';
import {Dialog} from '@angular/cdk/dialog';
import {InvoiceDetails} from '../../invoices/invoice-details/invoice-details';
import {InvoiceListManager} from '../../../core/services/Managers/invoice-list-manager';

@Component({
  selector: 'app-payment-viewer',
  imports: [
    ReportForm,
    JsonPipe,
  ],
  templateUrl: './payment-viewer.html',
  styleUrl: './payment-viewer.scss',
})
export class PaymentViewer {
  private reportsService = inject(PaymentsReportHttp);
  private invoiceManager = inject(InvoiceListManager);
  private dialog = inject(Dialog);
  query = signal<ReportQuery>({
    page:0,
    limit:10,
    type: 'ALL',
    start: '' ,
    end:'',
  });
  reportResource = rxResource({
    params : () =>{
      return {
        query : this.query(),
      }
    },
    stream: ({params}) => this.reportsService.generate(params.query)
  })
  report = computed(()=> this.reportResource.value())

  protected openInvoiceDialog(invoiceId: string) {
    this.invoiceManager.currentInvoice.set(invoiceId);
    this.dialog.open(InvoiceDetails)
  }
}
