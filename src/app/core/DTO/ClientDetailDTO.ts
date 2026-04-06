import {ClientEntity} from '../model/clientEntity';
import {InvoiceEntity} from '../model/InvoiceEntity';

export interface ClientDetailDTO{
  client: ClientEntity;
  invoices: InvoiceEntity[];
}
