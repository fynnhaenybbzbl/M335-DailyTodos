import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';
import { GoogleMap } from '@capacitor/google-maps';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GeolocatorService } from '../services/geolocator.service';
import { Geolocation } from '@capacitor/geolocation';
import { Todos } from '../data/todos';
import { EditTodoComponent } from '../modal/edit-todo/edit-todo.component';

const apiKey = '';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TodoComponent  implements OnInit {
  todo: Array<any> = [];
  todos : Array<Todos> | null = []

  latitude : number = 0
  longitude : number = 0

  constructor(public todoService: TodoService, private router : Router, public geolocationService : GeolocatorService, private modalCtrl: ModalController) {}
  
  async presentModal(id: number, title: string, description: string, time: string, latitude: number, longitude: number) {
    const modal = await this.modalCtrl.create({
      component: EditTodoComponent,
      componentProps: { 
        id: id,
        title: title,
        description: description,
        time: time,
        latitude: latitude,
        longitude: longitude
      }
    });
    return await modal.present();
  }

  async handleRefresh (event : any) {
    await this.loadData()
    event.target.complete()
  }

  delete (todo:Todos) {
    this.todoService.deleteTodo(todo)
      .then(payload =>  {
        this.todoService.getTodos()
          .then(data => {
            this.todos = data
          })
      })
  }

  async goto () {
    await this.router.navigate(['tabs','tab2'])
  }

  ngOnInit() {
    this.loadData();
    this.getCurrentPosition();
  }

  getCurrentPosition = async () => {
    const position = await Geolocation.getCurrentPosition({enableHighAccuracy: true})

    this.latitude = position.coords.latitude
    this.longitude = position.coords.longitude
  }

  loadData = async () => {
    let todo = await this.todoService.getTodos();
    this.todo = todo!;
  }

  @ViewChild('map')
  mapRef?: ElementRef<HTMLElement>;
  newMap?: GoogleMap;

  async createMap(lat1: number, lng1: number) {
    if (!this.mapRef) {
      console.error('Unable to create map, no element ref');
      return;
    }
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: apiKey,
      config: {
        center: {
          lat: this.latitude,
          lng: this.longitude,
        },
        zoom: 8,
      },
    });
    
    const marker = await this.newMap.addMarker({
      coordinate: {
        lat: lat1,
        lng: lng1
      }
    });

    const markerMyLocation = await this.newMap.addMarker({
      coordinate: {
        lat: this.latitude,
        lng: this.longitude
      }
    });

    const enableTouch = await this.newMap.enableTouch();

    const polylineConfig = {
      path: [
        { lat: lat1, lng: lng1 },
        { lat: this.latitude, lng: this.longitude },
      ],
      strokeColor: 'red',
      strokeWidth: 20,
      strokeOpacity: 0.8,
      strokeStyle: 'solid',
      geodesic: true,

    };

    const polylineReference = await this.newMap.addPolylines([polylineConfig]);
    console.log("TESt", lat1, lng1)
  }
}
