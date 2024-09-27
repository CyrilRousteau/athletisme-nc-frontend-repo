import { Component } from '@angular/core';
import { MapLeafletComponent } from '../component/map-leaflet/map-leaflet.component';

@Component({
  selector: 'app-club',
  standalone: true,
  imports: [MapLeafletComponent],
  templateUrl: './club.component.html',
  styleUrl: './club.component.css'
})
export class ClubComponent {

}
