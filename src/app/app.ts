import {Component, inject, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import Menu from './components/layout/menu/menu';
import {AppBar} from './components/layout/app-bar/app-bar';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {NavigationBar} from './components/layout/navigation-bar/navigation-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppBar, Menu, NavigationBar],

  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private router = inject(Router);
  protected readonly title = signal('Gestor Balneario');
  menuRail = signal(false);
  isMobile = signal(false);

  constructor() {
    (new BreakpointObserver()).observe([Breakpoints.XSmall,Breakpoints.Small]).subscribe(result => {
        this.isMobile.set(result.matches);
    })
  }
  protected toggleMenu() {
    this.menuRail.update(value => !value);
  }
  protected goHome() {
    this.router.navigate(['/']);
  }
}
