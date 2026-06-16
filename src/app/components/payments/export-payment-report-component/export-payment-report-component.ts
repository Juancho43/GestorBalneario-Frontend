import {Component, computed, inject, linkedSignal, output} from '@angular/core';
import {SelectInput} from '../../layout/select-input/select-input';
import {ReportForm} from '../report-form/report-form';
import {PaymentManager} from '../../../core/services/Managers/payment-manager';
import {ReportQuery} from '../../../core/Interfaces/ReportQuery';
import {ExportPaymentReportHandlers} from '../../../core/utils/other/export-payment-report-handlers';
import {ExportPaymentReportHttp} from '../../../core/services/PaymentHttp/export-payment-report-http';

@Component({
  selector: 'app-export-payment-report-component',
  imports: [
    SelectInput,
    ReportForm
  ],
  templateUrl: './export-payment-report-component.html',
  styleUrl: './export-payment-report-component.scss',
})
export class ExportPaymentReportComponent {
  private paymentManager = inject(PaymentManager);
  private exportService = inject(ExportPaymentReportHttp);
  private exportHandlers = inject(ExportPaymentReportHandlers);
  protected paymentMethods = computed(()=>this.paymentManager.paymentMethods());
  exportOptions = computed<string[]>(()=>['CSV','JSON','Imprimir']);
  exportOption =linkedSignal(()=>this.exportOptions()[0]);
  query = computed(()=>this.paymentManager.query());
  close = output();
 handleExportReport($event:ReportQuery){
    this.paymentManager.query.set($event);
    this.exportReport();
  }
  exportReport(){
    const format = this.exportOption();
    this.exportService.generate(this.query(),this.exportOption()).subscribe({
      next: (response) => {
        if (format === 'CSV') {
          this.exportHandlers.handleCsvStrategy(response);
        } else if (format === 'Imprimir' || format === 'print') {
          this.exportHandlers.handleHtmlStrategy(response);
        } else {
         this.exportHandlers.handleJsonStrategy(response);
        }
      },
      error: (err) => {
        console.error('Report generation failed. Assess and adjust!', err);
      }
    });
    this.close.emit();
  }
}
