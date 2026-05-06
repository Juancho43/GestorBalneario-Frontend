import {Component, computed, inject, input, linkedSignal, output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {form, FormField, min, required, validate} from '@angular/forms/signals';
import {ReservationEntity} from '../../../core/model/reservationEntity';
import {ClientEntity} from '../../../core/model/clientEntity';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {ServiceListManager} from '../../../core/services/Managers/service-list-manager';
import {ServiceEntity} from '../../../core/model/serviceEntity';
import {JsonPipe} from '@angular/common';
import {minDateValidator} from '../../../core/utils/validator/dateValidator';


@Component({
  selector: 'app-reservation-form',
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, FormField],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.scss',
})
export class ReservationForm {
  private serviceManager= inject(ServiceListManager);
  services = this.serviceManager.serviceList;
  service = computed(()=> {
    if (this.services()! && this.services().services.length > 0) {
      return this.services().services[0];
    }else{
      return {
        price:10,
        id:'service-123',
        name:'Booking-false'
      } as ServiceEntity;
    }
  });
  readonly reservationToEdit = input<ReservationEntity>();
  readonly client = input<ClientEntity>();
  readonly shadow = input<ShadowEntity>();
  reservation = linkedSignal<ReservationEntity>(()=> this.reservationToEdit() || {
    shadow: this.shadow(),
    dates: {
      checkIn: '',
      checkOut: '',
    },
    price:this.service().price?? 10,
    client: this.client(),
    serviceId: this.service().id!
  });
  reservationForm = form(this.reservation, (schemaPath) =>{
    required(schemaPath.dates.checkIn, {message:'La fecha y hora del Check-in es requerida'});
    required(schemaPath.dates.checkOut, {message:'La fecha y hora del Check-out es requerida '});
    min(schemaPath.price,0, {message:'El precio debe ser positivo'})
    validate(schemaPath.dates.checkOut,minDateValidator(schemaPath.dates.checkIn));
  });
  finalReservation = output<ReservationEntity>();
  // Gathers root errors and field-specific errors into one powerful signal
  allFormErrors = computed(() => {
    const root = this.reservationForm().errors() || [];

    const price = this.reservationForm.price().errors() || [];
    const checkIn = this.reservationForm.dates.checkIn().errors() || [];
    const checkOut = this.reservationForm.dates.checkOut().errors() || [];
    const client = this.reservationForm.client!().errors() || [];
    const shadow = this.reservationForm.shadow!()!.errors() || [];

    return [...root, ...price, ...checkIn, ...checkOut,...client,...shadow];
  });

  submitted(){
    if(!this.reservationForm().invalid()) {
      this.finalReservation.emit(this.reservation());
    }
  }
}

