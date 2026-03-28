import {ShadowEntity} from '../model/shadowEntity';
import {InvoiceEntity} from '../model/InvoiceEntity';
import {PaymentEntity} from '../model/paymentEntity';
import {ReservationEntity} from '../model/reservationEntity';
import {ClientEntity} from '../model/clientEntity';

export interface ReservationDetailDTO {
  reservation: ReservationEntity;
  shadow: ShadowEntity;
  client: ClientEntity;
  invoice: InvoiceEntity;
  payments: PaymentEntity[];
}
