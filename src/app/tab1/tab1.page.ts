import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, TodoComponent],
})
export class Tab1Page {
  constructor() {}
}
