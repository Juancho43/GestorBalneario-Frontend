import {Component, inject, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Theme} from './core/services/other/theme';
import {Menu} from './components/layout/menu/menu';
import {SeasonManager} from './core/services/Managers/season-manager';
import {CurrentSeasonDisplay} from './components/seasons/current-season-display/current-season-display';
import {NotificationHelper} from './core/services/other/notification-helper';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, RouterLink, CurrentSeasonDisplay],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly theme = inject(Theme);
  protected readonly title = signal('Gestor Balneario');
}
