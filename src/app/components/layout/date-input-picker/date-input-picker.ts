import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerInputEvent,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatFormField, MatInput, MatInputModule, MatLabel, MatSuffix} from '@angular/material/input';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideLuxonDateAdapter} from '@angular/material-luxon-adapter';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-date-input-picker',
  imports: [
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, FormsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-AR'},
    provideLuxonDateAdapter(),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './date-input-picker.html',
  styleUrl: './date-input-picker.scss',
})
export class DateInputPicker {
  readonly label = input<string>('Seleccione fecha');
  readonly initialValue = input<Date>();
  value= output<string>();
  protected onDateChange($event: MatDatepickerInputEvent<any, any>) {
    this.value.emit($event.value);
    console.log($event.value)
  }
}
