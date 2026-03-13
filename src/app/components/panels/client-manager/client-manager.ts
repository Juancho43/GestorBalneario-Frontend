import { Component } from '@angular/core';
import {TabMenu} from '../../layout/tab-menu/tab-menu';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-client-manager',
  imports: [
    TabMenu,
    RouterOutlet
  ],
  templateUrl: './client-manager.html',
  styleUrl: './client-manager.scss',
})
export class ClientManager {
  links= [
    {label: 'View clients', url:'view'},
    {label: 'Create client', url:'create'},
  ]
}
