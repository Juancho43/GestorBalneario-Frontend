import {ClientEntity} from '../model/clientEntity';
import {InvoiceEntity} from '../model/InvoiceEntity';
import {ReservationEntity} from '../model/reservationEntity';
import {PaymentEntity} from '../model/paymentEntity';

export interface InvoiceDetail {
  client: ClientEntity;
  invoice: InvoiceEntity;
  items: ReservationEntity[] | any[];
  payments: PaymentEntity[];
}
