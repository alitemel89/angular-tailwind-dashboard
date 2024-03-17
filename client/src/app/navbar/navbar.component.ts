import { Component } from '@angular/core';
import { DarkModeService } from '../services/dark-mode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  isDarkMode: boolean = false;
  constructor(private darkModeService: DarkModeService) {}

  ngOnInit(): void {
    // Subscribe to the isDarkMode$ observable to update isDarkMode property
    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }
}
