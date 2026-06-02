import {Component, inject, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import Menu from './components/layout/menu/menu';
import {AppBar} from './components/layout/app-bar/app-bar';
import {Theme} from './core/services/other/theme';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MAT_DATE_LOCALE} from '@angular/material/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppBar, Menu,],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }

  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private theme = inject(Theme);
  private router = inject(Router);
  protected readonly title = signal('Gestor Balneario');
  menuRail = signal(true);
  constructor() {
    (new BreakpointObserver()).observe(['(max-width: 600px)']).subscribe(result => {
      if (result.matches) {
        this.menuRail.set(false);
      } else {
        this.menuRail.set(true);
      }
    })
  }
  toggleMode() {
    this.theme.toggleTheme();
  }
  protected toggleMenu() {
    this.menuRail.update(value => !value);
  }
  protected goHome() {
    this.router.navigate(['/']);
  }
}
