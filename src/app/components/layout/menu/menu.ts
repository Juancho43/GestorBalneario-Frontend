import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
interface Link{
  icon: string;
  label: string;
  path?: string;
}
interface MenuLink {
  link: Link;
  subLinks?: Link[]
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
export class Menu {
  isOpen = signal(false);
  links: MenuLink[]  = [
    {
      link:{
        icon: 'date_range',
        label: 'Temporadas',
        path: 'season-manager'
      }
    },
    {
      link:{
        icon: 'beach_access',
        label: 'Carpas',
        path: 'shadow-view'
      }
    },
    {
      link:{
        icon:'book_online',
        label:'Reservas',
        path:'reservation-view'
      }
    },
    {
      link:{
        icon:'payments',
        label:'Pagos',
        path: 'payment-view'
      }
    },
    {
      link:{
        icon:'people',
        label:'Clientes',
        path:'client-view'
      }
    },
    {
      link:{
        label: 'Servicios',
        icon: "room_service",
        path:'service-manager'
      }
    },
    {
      link:{
        label: 'Facturas',
        icon: "receipt_long",
        path: 'invoice-viewer'
      }
    }

  ]
   protected toggleMenu() {
    this.isOpen.update(value => !value);
  }
}
