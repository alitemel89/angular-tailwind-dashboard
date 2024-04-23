import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { DarkModeService } from './services/dark-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'web-app';

  isDarkMode: boolean = false;
  constructor(private darkModeService: DarkModeService) {}

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  ngOnInit(): void {
    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
    initFlowbite();
  }
}