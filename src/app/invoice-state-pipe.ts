import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'invoiceState',
})
export class InvoiceStatePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value === 'PaidState') return 'Pagada'
    if (value === 'IssuedState') return 'Creada'
    return null;
  }
}
