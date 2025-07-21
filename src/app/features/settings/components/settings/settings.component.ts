import { Component, Inject, PLATFORM_ID, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../../services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent implements OnInit {
  public isDarkMode = false;
  public chartType = 'line';
  public enableRealtime = false;

  private platformId = inject(PLATFORM_ID);
  private themeService = inject(ThemeService);

  public ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      this.isDarkMode = savedTheme === 'dark';
      document.body.classList.toggle('dark-theme', this.isDarkMode);
    }
  }

  public toggleTheme() {
    this.themeService.toggleTheme();
  }

  public setRealtime() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('realtime', this.enableRealtime ? '1' : '0');
    }
  }
}
