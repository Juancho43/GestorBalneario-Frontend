import {Component, inject, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import Menu from './components/layout/menu/menu';
import {AppBar} from './components/layout/app-bar/app-bar';
import {Theme} from './core/services/other/theme';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {NavigationBar} from './components/layout/navigation-bar/navigation-bar';
import {takeUntil} from 'rxjs';

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
  currentScreenSize= signal('');
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);

  constructor() {
    inject(BreakpointObserver)
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe(result => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize.set( this.displayNameMap.get(query) ?? 'Unknown')
            console.log(this.currentScreenSize());
          }
        }
      });

    (new BreakpointObserver()).observe([Breakpoints.XSmall,Breakpoints.Small]).subscribe(result => {
      if (result.matches) {
        this.isMobile.set(true);
      } else {
        this.isMobile.set(false);
      }
    })
  }
  protected toggleMenu() {
    this.menuRail.update(value => !value);
  }
  protected goHome() {
    this.router.navigate(['/']);
  }
}
