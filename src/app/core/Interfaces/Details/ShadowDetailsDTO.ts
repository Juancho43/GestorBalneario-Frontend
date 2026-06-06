import {ShadowEntity} from '../../model/shadowEntity';
import {ReservationEntity} from '../../model/reservationEntity';

export interface ShadowDetailsDTO {
  shadow: ShadowEntity;
  reservations: ReservationEntity[];
}
