import {Component, computed, inject, signal} from '@angular/core';
import {PaymentsReportHttp} from '../../core/services/PaymentHttp/payments-report-http';
import {rxResource} from '@angular/core/rxjs-interop';
import {ReportQuery} from '../../core/Interfaces/ReportQuery';
import {ReportForm} from '../../components/payments/report-form/report-form';
import {Dialog} from '@angular/cdk/dialog';
import {InvoiceDetails} from '../../components/invoices/invoice-details/invoice-details';
import {InvoiceManager} from '../../core/services/Managers/invoice-manager.service';
import {PaymentsTable} from '../../components/payments/payments-table/payments-table';
import {ReportResponse} from '../../core/Interfaces/ReportResponse';
import {PaymentEntity} from '../../core/model/paymentEntity';
import {PaymentManager} from '../../core/services/Managers/payment-manager';
import {FABButton} from '../../components/layout/fab-button/fab-button';
import {SideSheet} from '../../components/layout/side-sheet/side-sheet';

@Component({
  selector: 'app-payment-viewer',
  imports: [
    ReportForm,
    PaymentsTable,
    FABButton,
    SideSheet,
  ],
  templateUrl: './payment-viewer.html',
  styleUrl: './payment-viewer.scss',
})
export class PaymentViewer {
  private reportsService = inject(PaymentsReportHttp);
  private invoiceManager = inject(InvoiceManager);
  private paymentManager = inject(PaymentManager)
  private dialog = inject(Dialog);
  sideSheetOpen = signal(true);
  protected paymentMethods = this.paymentManager.paymentMethods;
  query = signal<ReportQuery>({
    page:0,
    limit:10,
    type: 'ALL',
    start: new Date(),
    end: new Date()
  });
  reportResource = rxResource({
    params : () =>this.query(),
    stream: ({params}) => this.reportsService.generate(params)
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
