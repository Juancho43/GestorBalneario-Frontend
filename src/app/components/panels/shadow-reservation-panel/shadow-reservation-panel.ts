import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TabMenu} from '../../layout/tab-menu/tab-menu';

@Component({
  selector: 'app-shadow-reservation-panel',
  imports: [
    RouterOutlet,
    TabMenu
  ],
  templateUrl: './shadow-reservation-panel.html',
  styleUrl: './shadow-reservation-panel.scss',
})
export class ShadowReservationPanel {
  links= [
    {label: 'View reservations', url:'view'},
    {label: 'Create Reservation', url:'create'},
  ]

}
