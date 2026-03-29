import {effect, Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Theme {
  // Signal to track theme: 'light' | 'dark' | 'system'
  theme = signal<string>(localStorage.getItem('user-theme') || 'system');

  constructor() {
    // Effect to apply changes whenever the signal updates
    effect(() => {
      const currentTheme = this.theme();
      const isDark = currentTheme === 'dark' ||
        (currentTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

      document.documentElement.classList.toggle('dark', isDark);
      localStorage.setItem('user-theme', currentTheme);
    });
  }

  setTheme(newTheme: 'light' | 'dark' | 'system') {
    this.theme.set(newTheme);
  }
}
