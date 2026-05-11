import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentType',
})
export class PaymentTypePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if(value == 'CASH') return 'Efectivo'
    if(value == 'TRANSFER') return 'Transferencia'
    if(value == 'CREDIT_CARD') return 'Tarjeta de credito'
    if(value == 'CHECK') return 'Cheque'
    if(value == 'USD_DOLLAR') return 'Dolar'
    if(value == 'CRYPTO') return 'Cripto'
    if(value == 'OTHER') return 'Otro'
    return null;
  }
}
