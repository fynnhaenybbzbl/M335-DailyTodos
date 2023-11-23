import { CommonModule, Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TodoService } from '../services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Todos } from '../data/todos';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class CreateTodoComponent  implements OnInit {

  todo : Todos = new Todos()

  public todoForm = new FormGroup({
    id: new FormControl(0),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    time: new FormControl(0, Validators.required),
    latitude: new FormControl(0, Validators.required),
    longitude: new FormControl(0, Validators.required)
  })

  constructor(
      private todoService : TodoService,
      private formBuilder : FormBuilder,
      private router : Router,
      private route : ActivatedRoute,
      private notificationService: NotificationService) { }

  ngOnInit() {
  }

  saveTodo (formData : any) {
    this.todo = Object.assign(formData)
    this.notificationService.scheduleNotifications(formData.title, formData.description)
        this.todoService.createFood(this.todo)
          .then(payload=>{
            console.log("Gespeichert: ", this.todo)
          })
  }

  reset () {
    this.todoForm.reset()
  }

  back () {
    this.router.navigate(['tabs','tab1'])

  }

}