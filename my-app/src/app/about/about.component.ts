import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  title = 'locationApp';
  @ViewChild('mapElement') mapElement!: ElementRef;

  ngOnInit() {
    this.loadGoogleMaps();
    this.initMap();
  }


  loadGoogleMaps(): Promise<void> {
    return new Promise<void>((resolve) => {
      (window as any)['initGoogleMaps'] = () => {
        resolve();
      };

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places&callback=initGoogleMaps`;
      document.body.appendChild(script);
    });
  }


  initMap() {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported');
      return;
    }

    /*if (!google || !google.maps) {
      console.log('Google Maps API not loaded');
      return;
    }*/

    //se ia pozitia curenta si e setata ca centrul hartii
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const mapOptions = {
        center: { lat: latitude, lng: longitude },
        zoom: 14
      };


      const map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      // adauga marker la pozitia curenta 
      const marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: 'You are here!'
      });
    });
  }

  getCurrentLocation() {
    this.initMap();
  }
}
