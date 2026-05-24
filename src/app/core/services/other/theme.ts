import {DOCUMENT, inject, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  public isDarkMode = signal<boolean>(false);
  private document = inject(DOCUMENT);
  constructor() {
    this.applyTheme(false);
  }

  public toggleTheme(): void {
    const newThemeState = !this.isDarkMode();
    this.isDarkMode.set(newThemeState);
    this.applyTheme(newThemeState);
  }

  private applyTheme(isDark: boolean): void {
    const bodyClassList = this.document.body.classList;
    if (isDark) {
      bodyClassList.remove('light');
      bodyClassList.add('dark');
    } else {
      bodyClassList.remove('dark');
      bodyClassList.add('light');
    }
  }
}
