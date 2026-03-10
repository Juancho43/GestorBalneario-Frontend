import {JsonPipe} from '@angular/common';
import {Component, input, linkedSignal, output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {form, FormField} from '@angular/forms/signals';
import {ReservationEntity} from '../../../core/model/reservationEntity';
import {ClientEntity} from '../../../core/model/clientEntity';


@Component({
  selector: 'app-reservation-form',
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe, FormField],
  providers: [provideNativeDateAdapter()],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.scss',
})
export class ReservationForm {
  readonly reservationToEdit = input<ReservationEntity>();
  reservation = linkedSignal<ReservationEntity>(()=> this.reservationToEdit() || {
    shadowId: '',
    dates: {
      checkIn: '',
      checkOut: '',
    start: new Date(),
    end: new Date(),
    },
    client: {name: '', email: '', phone:''} as ClientEntity
  });
  reservationForm = form(this.reservation, (schemaPath) =>{

  });
  finalReservation = output<ReservationEntity>();

  submitted(){
    this.finalReservation.emit(this.reservation());
  }
}

