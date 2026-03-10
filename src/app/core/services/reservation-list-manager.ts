import {Injectable, signal} from '@angular/core';
import {ShadowEntity} from './shadowEntity';
import {ReservationEntity} from '../model/reservationEntity';

@Injectable({
  providedIn: 'root',
})
export class ReservationListManager {
  private reservations= signal<ReservationEntity[] >([]);
  getList(){
    return this.reservations();
  }
  addReservation(reservation:ReservationEntity) {
    this.reservations.set([...this.reservations(), reservation]);
  }
}
