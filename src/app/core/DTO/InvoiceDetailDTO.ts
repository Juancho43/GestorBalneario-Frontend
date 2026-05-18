import {ClientEntity} from '../model/clientEntity';
import {InvoiceEntity} from '../model/InvoiceEntity';
import {ReservationEntity} from '../model/reservationEntity';
import {PaymentEntity} from '../model/paymentEntity';
import {InvoiceItem} from '../model/invoiceItemEntity';

export interface InvoiceDetail {
  client: ClientEntity;
  invoice: InvoiceEntity;
  items: InvoiceItem[];
  payments: PaymentEntity[];
}
