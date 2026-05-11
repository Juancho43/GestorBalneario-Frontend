import {Component, computed, input, output} from '@angular/core';
import {CurrencyPipe, DatePipe, JsonPipe} from "@angular/common";
import {PaymentEntity} from '../../../core/model/paymentEntity';
import {PaymentTypePipe} from '../../../core/utils/pipes/payment-type-pipe';

@Component({
  selector: 'app-payments-table',
  imports: [
    CurrencyPipe,
    DatePipe,
    PaymentTypePipe,
    JsonPipe
  ],
  templateUrl: './payments-table.html',
  styleUrl: './payments-table.scss',
})
export class PaymentsTable {
  readonly payments = input.required<PaymentEntity[]>();
  clickedPayment = output<PaymentEntity>();

  protected total = computed(()=> {
    let total = 0;
    if(this.payments){
      this.payments()!.forEach(p => {
        total += this.calculateRowTotal(p);
      });
    }
    return total;
  })

  protected calculateRowTotal(payment: PaymentEntity){
    return payment.amount * payment.changeType ;
  }
}
