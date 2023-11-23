import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class AppComponent {

  constructor() {
    Preferences.get( 
      { key: 'darkMode' }
    ).then((value) => {
      this.initializeDarkTheme(value.value === 'true');
    });
  }

  initializeDarkTheme(isDark: boolean) {
    document.body.classList.toggle('dark', isDark);
  }
}
