import {Component, computed, inject, input, linkedSignal, output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {form, FormField, min, required, validate} from '@angular/forms/signals';
import {ReservationEntity} from '../../../core/model/reservationEntity';
import {ClientEntity} from '../../../core/model/clientEntity';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {ServiceEntity} from '../../../core/model/serviceEntity';
import {minDateValidator} from '../../../core/utils/validator/dateValidator';
import {ServiceManager} from '../../../core/services/Managers/service-manager';


@Component({
  selector: 'app-reservation-form',
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, FormField],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.scss',
})
export class ReservationForm {
  private serviceManager= inject(ServiceManager);
  services = computed(() => this.serviceManager.getList());
  service = linkedSignal(()=> {
    return this.services()![0] || {
      price:10,
      id:'service-123',
      name:'Booking-false'
    } as ServiceEntity;
  });

  readonly reservationToEdit = input<ReservationEntity>();
  readonly client = input<ClientEntity>();
  readonly shadow = input<ShadowEntity>();
  editMode = linkedSignal(()=>{
    if(this.reservationToEdit()) return true
    return false;
  })
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
  allFormErrors = computed(() => {
    const root = this.reservationForm().errors() || [];

    const price = this.reservationForm.price().errors() || [];
    const checkIn = this.reservationForm.dates.checkIn().errors() || [];
    const checkOut = this.reservationForm.dates.checkOut().errors() || [];
    const client = this.reservationForm.client!().errors() || [];
    const shadow = this.reservationForm.shadow!()!.errors() || [];

    return [...root, ...price, ...checkIn, ...checkOut,...client,...shadow];
  });

  constructor() {
    this.serviceManager.currentType.set('BOOKING');
  }
  submitted(){
    if(!this.reservationForm().invalid()) {
      this.finalReservation.emit(this.reservation());
    }
  }
}

