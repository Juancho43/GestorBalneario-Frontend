import {ClientEntity} from '../../model/clientEntity';
import {InvoiceEntity} from '../../model/InvoiceEntity';

export interface ClientDetailsDTO {
  client: ClientEntity;
  invoices: InvoiceEntity[];
}
