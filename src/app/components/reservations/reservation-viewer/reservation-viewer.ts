import {Component, computed, inject, signal} from '@angular/core';
import {ShadowListManager} from '../../../core/services/Managers/shadow-list-manager';
import {ReservationListManager} from '../../../core/services/Managers/reservation-list-manager';
import {ShadowEntity} from '../../../core/model/shadowEntity';
import {ShadowMap} from '../../shadows/shadow-map/shadow-map';
import {ReservationList} from '../reservation-list/reservation-list';

@Component({
  selector: 'app-reservation-viewer',
  imports: [
    ShadowMap,
    ReservationList
  ],
  templateUrl: './reservation-viewer.html',
  styleUrl: './reservation-viewer.scss',
})
export class ReservationViewer {
  private shadowListManager = inject(ShadowListManager);
  private reservationListManager = inject(ReservationListManager);
  shadows = computed(()=>this.shadowListManager.getList());
  currentShadow = signal<ShadowEntity>({} as ShadowEntity);
  select(event: any) {
    this.currentShadow.set(this.shadowListManager.getByCoords({ x: event.left, y: event.top })!);
  }

  handle(reservation: any) {
    this.reservationListManager.addReservation(reservation);
  }}
