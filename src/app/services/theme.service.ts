import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.darkModeSubject.asObservable();

  public constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem('theme');
      const isDark = saved === 'dark';
      this.setDarkMode(isDark);
    }
  }

  public setDarkMode(isDark: boolean) {
    this.darkModeSubject.next(isDark);
    if (isPlatformBrowser(this.platformId)) {
      document.body.classList.toggle('dark-theme', isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }

  public toggleTheme() {
    this.setDarkMode(!this.darkModeSubject.value);
  }
}
