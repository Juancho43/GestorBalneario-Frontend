import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [
    MatButton,
    MatMenu,
    MatMenuTrigger,
    RouterLink
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  links = [
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
      label: 'Seasons',
      subLinks: [
        {label : 'View seasons', url:'season-view'},
        {label: 'Create season', url:'season-create'},
      ]
    }
    // {label: 'Reservations', url:'reservation'},
    // {label: 'Clients', url:'client'},
    // {label: 'Payments', url:'payment'},
  ]
}
