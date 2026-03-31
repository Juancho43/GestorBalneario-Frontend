import {Component, inject, signal} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Theme} from './core/services/theme';
import {Menu} from './components/layout/menu/menu';
import {SeasonManager} from './core/services/Managers/season-manager';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly theme = inject(Theme);
  protected readonly title = signal('Gestor Balneario');
  private seasonManager = inject(SeasonManager);
  season = this.seasonManager.currentSeason;
}
