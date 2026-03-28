import {Component, computed, input} from '@angular/core';
import {MapItem} from '../../../core/DTO/ShadowMapDTO';
import {ReservationCard} from '../../reservations/reservation-card/reservation-card';
import {ReservationEntity} from '../../../core/model/reservationEntity';

@Component({
  selector: 'app-map-card',
  imports: [
    ReservationCard,
  ],
  templateUrl: './map-card.html',
  styleUrl: './map-card.scss',
})
export class MapCard {
  readonly item = input.required<MapItem>();
  reservation = computed<ReservationEntity>(()=>{
    const r = this.item().reservation!;
    r.client = this.item().client!;
    r.shadow = this.item().shadow!;
    return r;
  })

}
