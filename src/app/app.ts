import { Component, signal } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ShadowMap} from './components/shadows/shadow-map/shadow-map';
import {ShadowAdminPanel} from './components/panels/shadow-admin-panel/shadow-admin-panel';
import {TabMenu} from './components/layout/tab-menu/tab-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TabMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Gestor Balneario');
  links = [
    {label: 'Main Menu', url:''},
    {label: 'Shadows', url:'shadow'},
    {label: 'Reservations', url:'reservation'},
    {label: 'About', url: 'about'},

  ]
}
