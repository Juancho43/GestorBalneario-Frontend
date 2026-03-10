import {Time} from '@angular/common';
import {ClientEntity} from './clientEntity';

export interface ReservationEntity{
  id?: string;
  shadowId: string;
  dates: {
    checkIn: string;
    start: Date;
    end: Date;
    checkOut: string;
  }
  client: ClientEntity;

}
