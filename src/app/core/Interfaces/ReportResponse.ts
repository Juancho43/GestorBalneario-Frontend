import {PaymentEntity} from '../model/paymentEntity';

export interface ReportResponse{
  payments: PaymentEntity[];
  total: number;
}
