import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'serviceType',
})
export class ServiceTypePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if(value === 'RESERVATION') return 'Reserva'
    if(value === 'DISCOUNT') return 'Descuento'
    if(value === 'RECHARGE') return 'Recargo'
    if(value === 'OTHER') return 'Otro'
    return null;
  }
}
