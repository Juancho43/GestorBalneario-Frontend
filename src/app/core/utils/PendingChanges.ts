import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}

export const pendingChangesGuard: CanDeactivateFn<ComponentCanDeactivate> = (component) => {
  // Si el componente dice que se puede desactivar, avanzamos.
  // Si no, mostramos la confirmación nativa (o una personalizada).
  return component.canDeactivate()
    ? true
    : confirm('Tienes cambios sin guardar. ¿Seguro que quieres salir?');
};
