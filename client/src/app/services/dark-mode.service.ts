// dark-mode.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private darkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.darkModeSubject.asObservable();

  toggleDarkMode(): void {
    const currentMode = this.darkModeSubject.getValue();
    this.darkModeSubject.next(!currentMode);
  }
}
