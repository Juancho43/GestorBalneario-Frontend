import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TabMenu} from './components/layout/tab-menu/tab-menu';
import {Theme} from './core/services/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TabMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly theme = inject(Theme);
  protected readonly title = signal('Gestor Balneario');
  links = [
    {label: 'Main Menu', url:''},
    {label: 'Shadows', url:'shadow'},
    {label: 'Reservations', url:'reservation'},
    {label: 'Clients', url:'client'},
    {label: 'Payments', url:'payment'},
    {label: 'About', url: 'about'},
  ]
}
