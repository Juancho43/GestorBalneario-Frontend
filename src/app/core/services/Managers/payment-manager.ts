import {computed, inject, Injectable, signal} from '@angular/core';
import {CreatePaymentHttp} from '../PaymentHttp/create-payment-http';
import {PaymentEntity} from '../../model/paymentEntity';
import {GetPaymentMethods} from '../PaymentHttp/get-payment-methods';
import {rxResource} from '@angular/core/rxjs-interop';
import {PaymentsReportHttp} from '../PaymentHttp/payments-report-http';
import {InvoiceDetails} from '../../../components/invoices/invoice-details/invoice-details';
import {FabAction} from '../../../components/layout/fab-menu/fab-menu';
import {ReportQuery} from '../../Interfaces/ReportQuery';
import {ReportResponse} from '../../Interfaces/ReportResponse';

@Injectable({
  providedIn: 'root',
})
export class PaymentManager {
  private createHttp = inject(CreatePaymentHttp);
  private methodsHttp = inject(GetPaymentMethods);
  private reportsService = inject(PaymentsReportHttp);
  private getHttp = null;
  private updateHttp = null;

  private deleteHttp = null;

  private paymentMethodsResource = rxResource({
    stream:() => this.methodsHttp.execute()
  })
  paymentMethods = computed(() =>
    this.paymentMethodsResource.isLoading() && this.paymentMethodsResource.error() ? [] : this.paymentMethodsResource.value()?.data!
  )


  query = signal<ReportQuery>({
    page:0,
    limit:10,
    type: 'ALL',
    start: new Date(),
    end: new Date()
  });
  private reportResource = rxResource({
    params : () =>this.query(),
    stream: ({params}) => this.reportsService.generate(params)
  })

  report = computed(()=> {
      if(!this.reportResource.error() && !this.reportResource.isLoading()){
        return this.reportResource.value()?.data!;
      }else{
        return {
          payments : [],
          total : 0,
        } as ReportResponse
      }
    }
  )

  currentPayment = signal<string|null>(null);




  createPayment(payment: PaymentEntity) {
    this.createHttp.create(payment).subscribe(r =>{})
  }
  updatePayment(payment: PaymentEntity) {

  }
  deletePayment(payment: PaymentEntity) {

  }

}
