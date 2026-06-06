import {effect, inject, Injectable, linkedSignal, signal} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  private document = inject(DOCUMENT);
  private systemTheme = signal<'dark' | 'light'>(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );
  public isDarkMode = linkedSignal(() => this.systemTheme() === 'dark');

  constructor() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.systemTheme.set(e.matches ? 'dark' : 'light');
    });

    effect(() => {
      this.applyTheme(this.isDarkMode());
    });
  }
  public toggleTheme(){
    this.isDarkMode.update(p => !p);
  }
  private applyTheme(isDark: boolean): void {
    const bodyClassList = this.document.body.classList;
    bodyClassList.remove(isDark ? 'light' : 'dark');
    bodyClassList.add(isDark ? 'dark' : 'light');
  }
}
