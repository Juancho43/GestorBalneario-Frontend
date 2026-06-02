import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'reservationState',
})
export class ReservationStatePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    if (value === 'CreatedState') return 'Creada'
    if (value === 'ActiveState') return 'En progreso'
    if (value === 'CancelledState') return 'Cancelada'
    if (value === 'CompletedState') return 'Completada'
    return null;
  }
}
