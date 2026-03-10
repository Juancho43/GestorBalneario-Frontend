import {Component, computed, inject, signal} from '@angular/core';
import {ShadowDetail} from "../../../shadow-detail/shadow-detail";
import {ShadowMap} from "../../../shadow-map/shadow-map";
import {ShadowListManager} from '../../../core/services/shadow-list-manager';
import {ShadowEntity} from '../../../core/services/shadowEntity';
import {ReservationForm} from '../../../reservation-form/reservation-form';
import {ReservationListManager} from '../../../core/services/reservation-list-manager';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ReservationList} from '../../../reservation-list/reservation-list';

@Component({
  selector: 'app-shadow-reservation-panel',
  imports: [
    ShadowMap,
    ReservationForm,
    RouterOutlet,
    RouterLink,
    ReservationList
  ],
  templateUrl: './shadow-reservation-panel.html',
  styleUrl: './shadow-reservation-panel.scss',
})
export class ShadowReservationPanel {
  private shadowListManager = inject(ShadowListManager);
  private reservationListManager = inject(ReservationListManager);
  shadows = computed(()=>this.shadowListManager.getList());
  currentShadow = signal<ShadowEntity>({} as ShadowEntity);
  select(event: any) {
    this.currentShadow.set(this.shadowListManager.getByCoords({ x: event.left, y: event.top })!);
  }

  handle(reservation: any) {
    this.reservationListManager.addReservation(reservation);
  }
}
