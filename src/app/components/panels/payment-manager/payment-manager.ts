import { Component } from '@angular/core';
import {TabMenu} from '../../layout/tab-menu/tab-menu';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-payment-manager',
  imports: [
    TabMenu,
    RouterOutlet
  ],
  templateUrl: './payment-manager.html',
  styleUrl: './payment-manager.scss',
})
export class PaymentManager {

  links= [
    {label: 'View payments', url:'view'},
    {label: 'Create payments', url:'create'},
  ]

}
