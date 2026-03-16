import {JsonPipe} from '@angular/common';
import {Component, input, linkedSignal, output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {form, FormField} from '@angular/forms/signals';
import {ReservationEntity} from '../../../core/model/reservationEntity';
import {ClientEntity} from '../../../core/model/clientEntity';
import {ShadowEntity} from '../../../core/model/shadowEntity';


@Component({
  selector: 'app-reservation-form',
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe, FormField],
  providers: [provideNativeDateAdapter()],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.scss',
})
export class ReservationForm {
  readonly reservationToEdit = input<ReservationEntity>();
  readonly client = input.required<ClientEntity>();
  readonly shadow = input.required<ShadowEntity>();
  reservation = linkedSignal<ReservationEntity>(()=> this.reservationToEdit() || {
    shadow: this.shadow(),
    dates: {
      checkIn: '',
      checkOut: '',
    },
    client: this.client()
  });
  reservationForm = form(this.reservation, (schemaPath) =>{

  });
  finalReservation = output<ReservationEntity>();

  submitted(){
    this.finalReservation.emit(this.reservation());
  }
}

