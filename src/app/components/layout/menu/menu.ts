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
      label: 'Seasons',
      subLinks: [
        {label : 'View seasons', url:'season-view'},
        {label: 'Create season', url:'season-create'},
      ]
    },
    {
      label: 'Shadows',
      subLinks :[
        {label: 'Shadow Map', url:'shadow-view'},
        {label: 'Shadow Editor', url:'shadow-editor'},
      ]
    },
    {
      label: 'Reservations',
      subLinks: [
        {label: 'View reservations', url:'reservation-view'},
        {label: 'Create Reservation', url:'reservation-create'},
      ]
    },
    {
      label:'Payments',
      subLinks: [
        {label: 'View payments', url:'payment-view'},
        {label: 'Create payments', url:'payment-create'},
      ]
    },
    {
      label: 'Clients',
      subLinks: [
        {label: 'View clients', url:'client-view'},
      ]
    },
    {
      label: 'Services',
      subLinks: [
        {
          label: 'Manage Services', url: 'service-manager'
        }
      ]
    }
  ]
}
