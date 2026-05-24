import {Component, input, OnInit, output, signal} from '@angular/core';
import {ReportQuery} from '../../../core/DTO/ReportQuery';
import {form, FormField} from '@angular/forms/signals';
import {FormsModule} from '@angular/forms';
import {PaymentTypePipe} from '../../../core/utils/pipes/payment-type-pipe';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-report-form',
  imports: [
    FormsModule,
    FormField,
    PaymentTypePipe,
    MatIcon
  ],
  templateUrl: './report-form.html',
  styleUrl: './report-form.scss',
})
export class ReportForm implements OnInit {

  readonly paymentMethods = input.required<string[]>()
  query = signal<ReportQuery>({
    page:0,
    limit:10,
    type: 'ALL',
    start: '',
    end:''
  });

  queryForm = form(this.query);

  finalQuery = output<ReportQuery>();
  ngOnInit() {

    this.query.update(prev => {
      return{
        ...prev,
        start: new Date(new Date().setHours(0, 0, 0, 0)).toISOString().split('T')[0],
        end: new Date(new Date().setHours(23, 59, 59, 999)).toISOString().split('T')[0],
      }    })

  }

  submittedForm(){
    console.log(this.query());
    this.finalQuery.emit(this.query());
  }
}
