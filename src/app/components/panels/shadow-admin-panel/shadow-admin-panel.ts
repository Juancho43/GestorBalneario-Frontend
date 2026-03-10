import {Component} from '@angular/core';
import {TabMenu} from '../../layout/tab-menu/tab-menu';
import {RouterOutlet} from '@angular/router';
@Component({
  selector: 'app-shadow-admin-panel',
  imports: [
    TabMenu,
    RouterOutlet
  ],
  templateUrl: './shadow-admin-panel.html',
  styleUrl: './shadow-admin-panel.scss',
})
export class ShadowAdminPanel {
  links = [
    {label: 'Shadow Map', url:'view'},
    {label: 'Shadow Editor', url:'editor'},
  ]
}


