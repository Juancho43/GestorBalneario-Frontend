import {Component, input} from '@angular/core';
import {Link} from '../menu/menu';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-navigation-bar',
  imports: [
    RouterLinkActive,
    MatIcon,
    RouterLink
  ],
  templateUrl: './navigation-bar.html',
  styleUrl: './navigation-bar.scss',
})
export class NavigationBar {
  readonly isShown = input.required<boolean>();
  links: Link[] = [
    {
      icon:'map',
      label: 'Mapa',
      path: 'map'
    },
    {
      icon:'home',
      label: 'Inicio',
      path:'home'
    },
    {
      icon:'payments',
      label:'Pagos',
      path: 'payment-view'
    },
  ]
}
