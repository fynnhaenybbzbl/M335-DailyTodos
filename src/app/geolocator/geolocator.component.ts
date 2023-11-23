import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GeolocatorService } from '../services/geolocator.service';

@Component({
  selector: 'app-geolocator',
  templateUrl: './geolocator.component.html',
  styleUrls: ['./geolocator.component.scss'],
  standalone: true,
  imports: [IonicModule]
})

export class GeolocatorComponent  implements OnInit {

  latitude : number = 0
  longitude : number = 0

  constructor( public geolocationService : GeolocatorService) {  }

  getCurrentPosition = async () => {
    const position = await this.geolocationService.getCurrentPosition()

    this.latitude = position.coords.latitude
    this.longitude = position.coords.longitude
  }

  resetPosition () {
    this.latitude = 0
    this.longitude = 0
  }

  ngOnInit() {
    this.getCurrentPosition()
  }

}
