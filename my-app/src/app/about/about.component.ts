import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';



interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface PositionError {
  message: string;
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  map!: L.Map;
  currentLocation!: L.Marker;

  ngOnInit() {
    this.map = L.map('map').setView([0, 0], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.getCurrentLocation();
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          const { latitude, longitude } = position.coords;
          this.map.setView([latitude, longitude], 13);

          if (!this.currentLocation) {
            this.currentLocation = L.marker([latitude, longitude]).addTo(this.map);
          } else {
            this.currentLocation.setLatLng([latitude, longitude]);
          }
        },
        (error: PositionError) => {
          console.error('Error getting current location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

}
