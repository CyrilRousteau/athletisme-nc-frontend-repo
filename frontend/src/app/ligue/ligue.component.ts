import { Component } from '@angular/core';
import { MapLeafletComponent } from '../component/map-leaflet/map-leaflet.component';

@Component({
  selector: 'app-ligue',
  standalone: true,
  imports: [MapLeafletComponent],
  templateUrl: './ligue.component.html',
  styleUrl: './ligue.component.css'
})
export class LigueComponent {

}
