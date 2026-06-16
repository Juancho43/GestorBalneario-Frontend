import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shadowState',
})
export class ShadowStatePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if(value === 'AvailableState') return 'Disponible'
    if(value === 'BookedState') return 'Reservada'
    return null;
  }
}
