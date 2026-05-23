import { Component } from '@angular/core';
import {FABButton} from '../fab-button/fab-button';
interface MenuItem {
  icon: string;
  label?: string;
  action:string;
}
@Component({
  selector: 'app-fab-menu',
  imports: [
    FABButton
  ],
  templateUrl: './fab-menu.html',
  styleUrl: './fab-menu.scss',
})
export class FABMenu {
  items: MenuItem[] = [
    {icon: 'add',label:'Nueva reserva',action:'new-reservation'},
    ]
}
