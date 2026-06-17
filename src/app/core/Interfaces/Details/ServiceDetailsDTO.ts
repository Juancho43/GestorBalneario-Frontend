import {ServiceEntity} from '../../model/serviceEntity';

export interface ServiceDetailsDTO {
 service: ServiceEntity;
 invoices: number;
}
