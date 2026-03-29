import {Component, output, signal} from '@angular/core';
import {ReportQuery} from '../../../core/DTO/ReportQuery';
import {form, FormField} from '@angular/forms/signals';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-report-form',
  imports: [
    FormsModule,
    FormField
  ],
  templateUrl: './report-form.html',
  styleUrl: './report-form.scss',
})
export class ReportForm {


  query = signal<ReportQuery>({
    page:0,
    limit:10,
    type: 'ALL',
    start:'',
    end: '',
  });
  queryForm = form(this.query);

  finalQuery = output<ReportQuery>();

  submittedForm(){
    this.finalQuery.emit(this.query());
  }
}
