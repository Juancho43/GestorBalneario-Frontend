import {Component, OnInit, output, signal} from '@angular/core';
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
export class ReportForm implements OnInit {


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
    this.finalQuery.emit(this.query());
  }
}
