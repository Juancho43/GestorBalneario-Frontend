import {ShadowEntity} from '../model/shadowEntity';
import {ClientEntity} from '../model/clientEntity';
import {ReservationEntity} from '../model/reservationEntity';

export interface MapItem{
  shadow: ShadowEntity,
  client?: ClientEntity,
  reservation?: ReservationEntity,
}

export interface ShadowMapDTO {
  map: MapItem[]
}
