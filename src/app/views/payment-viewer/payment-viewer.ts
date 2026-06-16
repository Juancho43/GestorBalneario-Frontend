import {Component, computed, inject, signal} from '@angular/core';
import {ReportQuery} from '../../core/Interfaces/ReportQuery';
import {ReportForm} from '../../components/payments/report-form/report-form';
import {Dialog} from '@angular/cdk/dialog';
import {InvoiceDetails} from '../../components/invoices/invoice-details/invoice-details';
import {InvoiceManager} from '../../core/services/Managers/invoice-manager.service';
import {PaymentsTable} from '../../components/payments/payments-table/payments-table';
import {PaymentEntity} from '../../core/model/paymentEntity';
import {PaymentManager} from '../../core/services/Managers/payment-manager';
import {SideSheet} from '../../components/layout/side-sheet/side-sheet';
import {FabAction, FABMenu} from '../../components/layout/fab-menu/fab-menu';
import {
  ExportPaymentReportComponent
} from '../../components/payments/export-payment-report-component/export-payment-report-component';

@Component({
  selector: 'app-payment-viewer',
  imports: [
    ReportForm,
    PaymentsTable,
    SideSheet,
    FABMenu,
    ExportPaymentReportComponent,
  ],
  templateUrl: './payment-viewer.html',
  styleUrl: './payment-viewer.scss',
})
export class PaymentViewer {
  private paymentManager = inject(PaymentManager)
  private invoiceManager = inject(InvoiceManager);
  private dialog = inject(Dialog);
  protected paymentMethods = computed(()=>this.paymentManager.paymentMethods());
  protected report = computed(()=>this.paymentManager.report());
  reportSideSheetOpen = signal(true);
  exportSideSheetOpen = signal(false);

  protected readonly actions = signal<FabAction[]>(
    [
      {
        name:"export",
        icon:"download",
        tooltip: "Exportar reporte"
      },
      {
        name: "generate",
        icon: "tune",
        tooltip: "Generar reporte"
      }
    ]
  );

  protected openInvoiceDialog(payment: PaymentEntity) {
    this.invoiceManager.selectedInvoiceId.set(payment.invoiceId!);
    this.dialog.open(InvoiceDetails)
  }
  protected handleMenuAction($event: string) {
    if($event == 'generate'){
      this.reportSideSheetOpen.set(true);
      this.exportSideSheetOpen.set(false);
    }else if ($event == 'export'){
      this.reportSideSheetOpen.set(false);
      this.exportSideSheetOpen.set(true);
    }
  }

  protected handleReportForm($event: ReportQuery) {
   this.paymentManager.query.set($event);
   this.reportSideSheetOpen.set(false);
   this.exportSideSheetOpen.set(false);
  }
}
