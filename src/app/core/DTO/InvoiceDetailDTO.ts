import {ClientEntity} from '../model/clientEntity';
import {InvoiceEntity} from '../model/InvoiceEntity';
import {ReservationEntity} from '../model/reservationEntity';

export interface InvoiceDetail {
  client: ClientEntity;
  invoice: InvoiceEntity;
  items: ReservationEntity[] | any[];
}
