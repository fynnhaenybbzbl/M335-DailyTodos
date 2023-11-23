import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CreateTodoComponent } from '../create-todo/create-todo.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CreateTodoComponent]
})
export class Tab2Page {

  constructor() {}

}
