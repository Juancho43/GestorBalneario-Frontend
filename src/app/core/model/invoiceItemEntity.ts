import {ReservationEntity} from './reservationEntity';

export interface InvoiceItem {
  id:string;
  serviceId: string;
  description: string;
  price: number;
  quantity: number;
  invoiceId?:string;
  aggregate: string;
  clientId?:string
  type?: string;
  aggregateObject: ReservationEntity | any;
}
