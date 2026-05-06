import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentType',
})
export class PaymentTypePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
