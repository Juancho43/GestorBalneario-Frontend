import {Component, computed, input} from '@angular/core';
import {CurrencyPipe, DatePipe} from "@angular/common";
import {PaymentEntity} from '../../../core/model/paymentEntity';

@Component({
  selector: 'app-payments-table',
  imports: [
    CurrencyPipe,
    DatePipe
  ],
  templateUrl: './payments-table.html',
  styleUrl: './payments-table.scss',
})
export class PaymentsTable {
  readonly payments = input.required<PaymentEntity[]>();

  protected total = computed(()=> {
    let total = 0;
    if(this.payments){
      this.payments()!.forEach(p => {
        total += p.amount * p.changeType ;
      });
    }
    return total;
  })
}
