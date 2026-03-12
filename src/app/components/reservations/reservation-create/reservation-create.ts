import {Component, computed, inject, signal} from '@angular/core';
import {ReservationForm} from '../reservation-form/reservation-form';
import {ReservationListManager} from '../../../core/services/reservation-list-manager';
import {ShadowMap} from '../../shadows/shadow-map/shadow-map';
import {ShadowListManager} from '../../../core/services/shadow-list-manager';
import {ClientForm} from '../../clients/client-form/client-form';
import {ClientEntity} from '../../../core/model/clientEntity';

@Component({
  selector: 'app-reservation-create',
  imports: [
    ReservationForm,
    ShadowMap,
    ClientForm
  ],
  templateUrl: './reservation-create.html',
  styleUrl: './reservation-create.scss',
})
export class ReservationCreate {
  private shadowManager = inject(ShadowListManager);
  shadows = computed(() => this.shadowManager.getList());
  client = signal<ClientEntity>({name: '', email: '', phone:''});
  shadow = signal(this.shadows()[0]);
  private reservationListManager = inject(ReservationListManager);
  handle(reservation: any) {
    this.reservationListManager.addReservation(reservation);
  }

  protected setShadow(event: any) {
   this.shadow.set(this.shadowManager.getByIdentifier(event._objects[1].text)!);
  }
}
