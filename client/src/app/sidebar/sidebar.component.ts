import { Component } from '@angular/core';
import { DarkModeService } from '../services/dark-mode.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  isDarkMode: boolean = false;

  constructor(private darkModeService: DarkModeService) {}


  ngOnInit(): void {
    // Subscribe to the isDarkMode$ observable to update isDarkMode property
    this.darkModeService.isDarkMode$.subscribe((isDarkMode) => {
      this.isDarkMode = isDarkMode;
    });
  }

}
