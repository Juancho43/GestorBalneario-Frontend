import {ShadowEntity} from '../model/shadowEntity';
import {ClientEntity} from '../model/clientEntity';
import {ReservationEntity} from '../model/reservationEntity';

export interface ShadowMapDTO {
  map: {
    shadow: ShadowEntity,
    client?: ClientEntity,
    reservation?: ReservationEntity,
  }[]
}
