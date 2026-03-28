import {ShadowEntity} from '../model/shadowEntity';
import {ReservationEntity} from '../model/reservationEntity';

export interface ShadowHistory {
  shadow: ShadowEntity;
  reservations: ReservationEntity[];
}
