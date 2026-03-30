import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Theme} from './core/services/theme';
import {Menu} from './components/layout/menu/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly theme = inject(Theme);
  protected readonly title = signal('Gestor Balneario');

}
