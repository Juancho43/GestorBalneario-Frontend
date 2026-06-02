import {Component, computed, input, linkedSignal, output, signal} from '@angular/core';
import {ReportQuery} from '../../../core/Interfaces/ReportQuery';
import {FormsModule} from '@angular/forms';
import {PaymentTypePipe} from '../../../core/utils/pipes/payment-type-pipe';
import {SelectInput} from '../../layout/select-input/select-input';
import {DateInputPicker} from '../../layout/date-input-picker/date-input-picker';

@Component({
  selector: 'app-report-form',
  imports: [
    FormsModule,
    SelectInput,
    DateInputPicker
  ],
  templateUrl: './report-form.html',
  styleUrl: './report-form.scss',
})
export class ReportForm{
  readonly paymentMethods = input.required<string[]>()
  pipe = new PaymentTypePipe()
  paymentOptions = computed(() => {
    if(this.paymentMethods()){
      let array = this.paymentMethods();
      array.push('ALL')
      return array;
    }
    return [];
  })
  starDate  = linkedSignal(()=>new Date());
  endDate =linkedSignal(()=>new Date());
  page = signal(0);
  pageSize = signal(10);
  paymentType = signal('ALL')
  query = computed<ReportQuery>(()=>({
    page:this.page(),
    limit:this.pageSize(),
    type: this.paymentType(),
    start: this.starDate(),
    end: this.endDate(),
  }));

  finalQuery = output<ReportQuery>();
  submittedForm(){
    this.finalQuery.emit(this.query());
  }


  protected handleEndDate($event: string) {
    this.endDate.set(new Date($event))
  }

  protected handleStartDate($event: string) {
    this.starDate.set(new Date($event))
  }
}
