import {ElementRef, inject, Injectable, signal, Type} from '@angular/core';
import {Overlay, OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class OverlayHelper {
  private overlay = inject(Overlay);
  private overlayRef = signal< OverlayRef | null>(null);
// 1. Método principal de apertura modificado para devolver la referencia
  open(component: Type<any>, config?: OverlayConfig) {
    const overlayRef = this.overlay.create(config);
    overlayRef.attach(new ComponentPortal(component));
    return overlayRef; // ¡Clave! Debes devolver la referencia para poder cerrarlo después.
  }

  // ========================================================================
  // CONFIGURACIONES PREDEFINIDAS (FACTORÍAS)
  // ========================================================================

  /**
   * Configuración para Menús Desplegables (Dropdowns / Kebab Menus)
   * Se ancla a un elemento específico y se cierra al hacer clic fuera.
   */
  getDropdownConfig(origin: HTMLElement | ElementRef): OverlayConfig {
    const element = origin instanceof ElementRef ? origin.nativeElement : origin;

    return new OverlayConfig({
      hasBackdrop: true,
      // Usamos un fondo transparente para capturar clics fuera sin oscurecer la pantalla
      backdropClass: 'cdk-overlay-transparent-backdrop',
      positionStrategy: this.overlay.position()
        .flexibleConnectedTo(element)
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
            offsetY: 8 // Pequeño margen para la estética de flotación M3
          },
          // Posición de respaldo si no hay espacio abajo
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
            offsetY: -8
          }
        ]),
      // Si el usuario hace scroll, el menú recalcula su posición para no separarse del botón
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
  }

  /**
   * Configuración para Modales Centrados (Diálogos de Confirmación, Formularios)
   * Aparece en el centro exacto de la pantalla y bloquea el fondo.
   */
  getModalConfig(): OverlayConfig {
    return new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop', // Fondo oscuro clásico de modal
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      // Bloquea el scroll de la página de fondo mientras el modal está abierto
      scrollStrategy: this.overlay.scrollStrategies.block()
    });
  }
  setRef(overlayRef: OverlayRef | null) {
    this.overlayRef.set(overlayRef);
  }
  getRef() {
    return this.overlayRef();
  }
}
