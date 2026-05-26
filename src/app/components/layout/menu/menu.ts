import {Component, input, linkedSignal, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
interface Link{
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
  isOpen = input.required<boolean>();
  links: Link[]  = [
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


}
