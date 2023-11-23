import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  async scheduleNotifications(title: string, body: string) {

    LocalNotifications.schedule({
      notifications: [
        {
          title: "Folgende Todo wurde gespeichert: "+ title,
          body: body,
          id: 1,
          schedule: { at: new Date(Date.now() + 1000), allowWhileIdle: true },
        },
      ],
    });
  }
}
