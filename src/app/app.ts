import {Component, inject, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {Menu} from './components/layout/menu/menu';
import {AppBar} from './components/layout/app-bar/app-bar';
import {Theme} from './core/services/other/theme';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, AppBar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private theme = inject(Theme);
  private router = inject(Router);
  protected readonly title = signal('Gestor Balneario');
  menuRail = signal(true);
  protected toggleMenu() {
    this.menuRail.update(value => !value);
  }
  toggleMode() {
    this.theme.toggleTheme();
  }
  protected goHome() {
    this.router.navigate(['/']);
  }
}
