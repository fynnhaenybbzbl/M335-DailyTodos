import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GeolocatorComponent } from '../geolocator/geolocator.component';
import { BatteryStatusComponent } from '../battery-status/battery-status.component';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, GeolocatorComponent, BatteryStatusComponent]
})
export class SettingsComponent  implements OnInit {
  private _themeToggle = false;

  get themeToggle(): boolean {
    return this._themeToggle;
  }

  set themeToggle(value: boolean) {
    Preferences.set({ key: 'darkMode', value: value.toString() });
    this._themeToggle = value;
  }

  ngOnInit() {
    Preferences.get(
      { key: 'darkMode' }
    ).then((value) => {
      this.initializeDarkTheme(value.value === 'true');
    });
  }

  initializeDarkTheme(isDark: any) {
    this.themeToggle = isDark;
    this.toggleDarkTheme(isDark);
  }

  toggleChange(ev: any) {
    this.toggleDarkTheme(ev.detail.checked);
  }

  toggleDarkTheme(shouldAdd: any) {
    document.body.classList.toggle('dark', shouldAdd);
  }
}