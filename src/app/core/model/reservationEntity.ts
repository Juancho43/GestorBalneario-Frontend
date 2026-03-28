import {ClientEntity} from './clientEntity';
import {ShadowEntity} from './shadowEntity';

export interface ReservationEntity{
  id?: string;
  shadow?: ShadowEntity;
  shadowId?: string;
  dates: {
    checkIn: string;
    checkOut: string;
  }
  client?: ClientEntity;
  duration?: number;
  price: number;
  serviceId?: string;
}
