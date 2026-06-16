import {Component, computed, effect, inject, input, linkedSignal, output} from '@angular/core';
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
import {MatInput} from '@angular/material/input';
import {DateInputPicker} from '../../layout/date-input-picker/date-input-picker';
import {SelectInput} from '../../layout/select-input/select-input';

export function requireValidSelection(errorKind: string, errorMessage: string) {
  return (context: any) => {
    if (context.value?.id === 'none') {
      return { kind: errorKind, message: errorMessage };
    }
    return null;
  };
}

@Component({
  selector: 'app-reservation-form',
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, FormField, MatInput, DateInputPicker, SelectInput],
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.scss',
})
export class ReservationForm {
  private serviceManager = inject(ServiceManager);
  services = computed(() => this.serviceManager.getList() || []);
  service = linkedSignal(() => {
    return this.services()?.[0] || {
      price: 10,
      id: 'service-123',
      name: 'Booking-false'
    } as ServiceEntity;
  });
  servicesToDisplay = computed(() => this.services().map(p => p.name))
  readonly reservationToEdit = input<ReservationEntity>();
  readonly client = input<ClientEntity>();
  readonly shadow = input<ShadowEntity>();
  editMode = linkedSignal(() => {
    return !!this.reservationToEdit();
  })
  reset = output<boolean>()
  reservation = linkedSignal<ReservationEntity>(() => {
    const reservationToEdit = this.reservationToEdit();
    if (reservationToEdit) {
      return {
        ...reservationToEdit,
        dates: {
            checkIn: this.formatParaInput(reservationToEdit.dates.checkIn),
            checkOut: this.formatParaInput(reservationToEdit.dates.checkOut)
          }
      }
    } else {
      return {
        shadow: {id: 'none'} as ShadowEntity,
        dates: {
          checkIn: '',
          checkOut: '',
        },
        price: 10,
        client: {id: 'none'} as ClientEntity,
        serviceId: ''
      };
    }


  });
  reservationForm = form(this.reservation, (schemaPath) => {
      required(schemaPath.dates.checkIn, {message: 'La fecha y hora del Check-in es requerida'});
      required(schemaPath.dates.checkOut, {message: 'La fecha y hora del Check-out es requerida '});
      min(schemaPath.price, 0, {message: 'El precio debe ser positivo'})
      validate(schemaPath.dates.checkOut, minDateValidator(schemaPath.dates.checkIn));
      if (schemaPath.client!) {
        validate(schemaPath.client, requireValidSelection('invalidClient', 'Debe seleccionar un cliente'));
      }
      if (schemaPath.shadow!) {
        validate(schemaPath.shadow, requireValidSelection('invalidShadow', 'Debe asignar una carpa o sombrilla'));
      }
    }
  );
  finalReservation = output<ReservationEntity>();
  allFormErrors = computed(() => {
    const root = this.reservationForm().errors() || [];

    const price = this.reservationForm.price().errors() || [];
    const checkIn = this.reservationForm.dates.checkIn().errors() || [];
    const checkOut = this.reservationForm.dates.checkOut().errors() || [];
    const client = this.reservationForm.client?.().errors() || [];
    const shadow = this.reservationForm.shadow?.().errors() || [];

    return [...root, ...price, ...checkIn, ...checkOut, ...client, ...shadow];
  });

  constructor() {
    this.serviceManager.currentType.set('RESERVATION');
    effect(() => {
      this.client()
      this.reservation.update(p => {
        return {...p, client: this.client()}
      })
    });
    effect(() => {
      this.shadow()
      this.reservation.update(p => {
        return {...p, shadow: this.shadow()}
      })
    });
  }

  submitted() {
    if (!this.reservationForm().invalid()) {
      this.finalReservation.emit(this.reservation());
    }
  }

  protected handleServiceChange(event: string) {
    const service =  this.services().find(s => s.name == event);
    if (service) {
      this.reservation.update(prev => ({
        ...prev,
        serviceId:service.id,
        price: service.price
      }));
    }
  }
  protected handleReset() {
    this.editMode.set(false)
    this.reset.emit(true)
    this.reservation.update(() => ({
      shadow: {id: 'none'} as ShadowEntity,
      dates: {
        checkIn: '',
        checkOut: '',
      },
      price: 10,
      client: {id: 'none'} as ClientEntity,
      serviceId: ''
    }))
  }

  private formatParaInput(isoDate: string | undefined): string {
    if (!isoDate) return '';
    return isoDate.substring(0, 16);
  }
  handleCheckInDate(date:string){
    const checkIn = new Date(date);
    this.reservation.update(prev => ({
      ...prev,
      dates:{
        checkIn:checkIn.toISOString(),
        checkOut: prev.dates.checkOut
      }
    }))
  }

  handleCheckOutDate(date:string ){
    const checkOut = new Date(date);
    this.reservation.update(prev => ({
      ...prev,
      dates:{
        checkOut:checkOut.toISOString(),
        checkIn: prev.dates.checkIn
      }
    }))
  }
}


