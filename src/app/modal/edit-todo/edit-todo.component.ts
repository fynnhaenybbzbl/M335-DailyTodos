import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { Todos } from 'src/app/data/todos';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, ReactiveFormsModule]
})
export class EditTodoComponent implements OnInit{
  id!: number
  title?: string
  description?: string
  time?: string
  latitude?: number
  longitude?: number

  name: string = '';

  todo : Todos = new Todos()

  newid!: number


  constructor(private modalCtrl: ModalController, private todoService : TodoService, private formBuilder : FormBuilder

    ) {}

    public todoForm = new FormGroup({
      id: new FormControl(this.newid, Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      time: new FormControl(0, Validators.required),
      latitude: new FormControl(0, Validators.required),
      longitude: new FormControl(0, Validators.required)
    })

    updateTodo (formData : any) {
      this.todo = Object.assign(formData)
      this.todoService.updateTodo({...this.todo, id: this.id})
    }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  ngOnInit() {
    this.newid = this.id
    console.log("EditTodoComponent: ", this.id)
    console.log("new: ", this.newid)
    console.log("Mitgeschicjt: ", `${this.id} ${this.title} ${this.description} ${this.time} ${this.latitude} ${this.longitude}`);
  }
  }