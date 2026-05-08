import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {CdkMenu, CdkMenuBar, CdkMenuItem, CdkMenuTrigger} from '@angular/cdk/menu';

@Component({
  selector: 'app-menu',
  imports: [
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    RouterLink,
    CdkMenuBar,
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  links = [
    {
      label: 'Temporadas',
      subLinks: [
        {label : 'Ver temporadas', url:'season-view'},
        {label: 'Editar temporadas', url:'season-create'},
      ]
    },
    {
      label: 'Carpas',
      subLinks :[
        {label: 'Mapa de carpas', url:'shadow-view'},
        {label: 'Editor del mapa', url:'shadow-editor'},
      ]
    },
    {
      label: 'Reservas',
      subLinks: [
        {label: 'Ver reservas', url:'reservation-view'},
        {label: 'Crear reservas', url:'reservation-create'},
      ]
    },
    {
      label:'Pagos',
      subLinks: [
        {label: 'Ver pagos', url:'payment-view'},
        {label: 'Crear pagos', url:'payment-create'},
      ]
    },
    {
      label: 'Clientes',
      subLinks: [
        {label: 'Ver clientes', url:'client-view'},
      ]
    },
    {
      label: 'Servicios',
      subLinks: [
        {
          label: 'Editar Servicios', url: 'service-manager'
        }
      ]
    }
  ]
}
