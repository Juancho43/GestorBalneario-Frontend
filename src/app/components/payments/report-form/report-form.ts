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
  protected pipe = new PaymentTypePipe()
  protected paymentOptions = computed<string[]>(() => {
    const methods = this.paymentMethods();
    if (methods && methods.length > 0) {
      return ['ALL', ...methods];
    }
    return ['ALL'];
  });
  protected starDate  = linkedSignal(()=>new Date());
  protected endDate =linkedSignal(()=>new Date());
  protected page = signal(0);
  protected pageSize = signal(10);
  protected paymentType = signal('ALL')
  protected query = computed<ReportQuery>(()=>({
    page:this.page(),
    limit:this.pageSize(),
    type: this.paymentType(),
    start: this.starDate(),
    end: this.endDate(),
  }));

  finalQuery = output<ReportQuery>();
  protected submittedForm(){
    this.finalQuery.emit(this.query());
  }

  protected handleEndDate($event: string) {
    this.endDate.set(new Date($event))
  }

  protected handleStartDate($event: string) {
    this.starDate.set(new Date($event))
  }
}
