import {Component, computed, inject, input, output} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {Theme} from '../../../core/services/other/theme';

export interface Link{
  icon: string;
  label: string;
  path?: string;
}

@Component({
  selector: 'app-menu',
  imports: [
    MatIcon,
    RouterLink,
    RouterLinkActive,
    MatTooltip
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export default class Menu {
  private theme = inject(Theme);
  readonly isOpen = input.required<boolean>();
  readonly isMobile = input.required<boolean>();
  protected darkMode = computed(() => this.theme.isDarkMode());
  protected show = computed(() => this.isOpen() || !this.isMobile());
  closed = output();
  protected links: Link[]  = [
    {
      icon:'home',
      label: 'Inicio',
      path:'home'
    },
    {
      icon: 'date_range',
      label: 'Temporadas',
      path: 'season-manager'
    },
    {
      icon:'map',
      label: 'Mapa',
      path: 'map'
    },
    {
      icon: 'beach_access',
      label: 'Carpas',
      path: 'shadow-view'
    },
    {
      icon:'book_online',
      label:'Reservas',
      path:'reservation-view'
    },
    {
      icon:'payments',
      label:'Pagos',
      path: 'payment-view'
    },
    {
      icon:'people',
      label:'Clientes',
      path:'client-view'
    },
    {
      label: 'Servicios',
      icon: "room_service",
      path:'service-manager'
    },
    {
      label: 'Facturas',
      icon: "receipt_long",
      path: 'invoice-viewer'
    }

  ]
  toggleMode(){
    this.theme.toggleTheme();
  }

  close(){
    if(this.isMobile()){
      this.closed.emit()
    }
  }
}
