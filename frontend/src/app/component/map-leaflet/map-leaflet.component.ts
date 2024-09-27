import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

interface LigueSportive {
  nom: string;
  lat: number;
  lng: number;
  sport: string;
  icon: string;
  photo: string;
  tel: string;
  email: string;
  adresse: string;
}

@Component({
  selector: 'app-map-leaflet',
  templateUrl: './map-leaflet.component.html',
  styleUrls: ['./map-leaflet.component.css'],
  standalone: true,
})
export class MapLeafletComponent implements OnInit, AfterViewInit {
  private map!: L.Map;

  ngOnInit() {
    // Initialisation si nécessaire
  }

  ngAfterViewInit() {
    this.configMap();
  }

  private configMap(): void {
    // Coordonnées de Nouméa
    const noumeaCenter = L.latLng(-22.2758, 166.4581);

    // Initialiser la carte
    this.map = L.map('map').setView(noumeaCenter, 13);

    // Ajouter une couche de tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18
    }).addTo(this.map);

    // Données des ligues sportives (à remplacer par vos données réelles)
    const liguesSportives: LigueSportive[] = [
      {
        nom: "JS-Vallée du Tir",
        lat: -22.2758,
        lng: 166.4655,
        sport: "athlétisme running",
        icon: "../../assets/img/icone-leaflet.png",
        photo: ".../../assets/img/jsvdt.png",
        tel: "+687 78 78 96",
        email: "sergeletocart56@gmail.com",
        adresse: "23 Cyprien Equerre, Magenta"
      },
      {
        nom: "Olympique de nouméa section athlé",
        lat: -22.2774,
        lng: 166.4538,
        sport: "rugby",
        icon: "../../assets/img/icone-leaflet.png",
        photo: "../../assets/img/oln.png",
        tel: "+687 78 12 78",
        email: "savipapaye@gmail.com",
        adresse: "Club House de Ste Marie, 57 rue Taragnat, Nouméa"
      },
      {
        nom: "Club Athlétique Jules Garnier",
        lat: -22.2710,
        lng: 166.4568,
        sport: "Athlétisme",
        icon: "../../assets/img/icone-leaflet.png",
        photo: "../../assets/img/cajg.PNG",
        tel: "+687 78 75 61",
        email: "w.imbert@lagoon.nc",
        adresse: "51 rue du Marechal Juin, Nouméa"
      },
      {
        nom: "AS Magenta Noumea",
        lat: -22.2792,
        lng: 166.4626,
        sport: "trail, course, fond",
        icon: "../../assets/img/icone-leaflet.png",
        photo: "../../assets/img/asmagenta.png",
        tel: "+687 78 13 64",
        email: "georges.lasserre@yahoo.fr",
        adresse: "24 rue R. Milliard, Vallée des Colons, Nouméa"
      },
      {
        nom: "ASPTT Nouvelle-Calédonie",
        lat: -22.2977,
        lng: 166.4412,
        sport: "rugby",
        icon: "../../assets/img/icone-leaflet.png",
        photo: "../../assets/img/asptt.png",
        tel: "+687 85 55 61",
        email: "asptt.athle.raids@gmail.com",
        adresse: "Siege social : BP 14941, 98803 Nouméa Cedex"
      },
      {
        nom: "Track nc",
        lat: -22.2654,
        lng: 166.4644,
        sport: "athlétisme, trail, course, fond",
        icon: "../../assets/img/icone-leaflet.png",
        photo: "../../assets/img/tracknc.PNG",
        tel: "+687 54 25 25",
        email: "contact@track.nc",
        adresse: "2 rue Maurice Herzog, Nouméa"
      },
      {
        nom: "AS Rivière Salée",
        lat: -22.2416,
        lng: 166.4619,
        sport: "athlétisme",
        icon: "../../assets/img/icone-leaflet.png",
        photo: "../../assets/img/asrs.png",
        tel: "+687 92 13 72",
        email: "durandthierry@mls.nc",
        adresse: "Siège social : BP 31226, 98895 Nouméa Cedex"
      },
      {
        nom: "Athletic club espoir de Boulari",
        lat: -22.2271,
        lng: 166.5182,
        sport: "Athlétisme",
        icon: "../../assets/img/icone-leaflet.png",
        photo: "../../assets/img/aceb.png",
        tel: "+687 76 99 84",
        email: "transport.fili@gmail.com",
        adresse: " Complexe BOEWA, Boulari"
      },
      // Ajoutez d'autres ligues ici
    ];

    // Ajouter des marqueurs pour chaque ligue
    liguesSportives.forEach(ligue => {
      const icon = L.icon({
        iconUrl: ligue.icon,
        iconSize: [22, 26],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const marker = L.marker([ligue.lat, ligue.lng], {icon: icon}).addTo(this.map);

      const popupContent = `
        <div style="width: 150px, z-index: 50">
          <h3>${ligue.nom}</h3>
          <img src="${ligue.photo}" alt="${ligue.nom}" style="width: 14%; max-height: 32px; object-fit: cover;">
          <p><strong>Sport:</strong> ${ligue.sport}</p>
          <p><strong>Téléphone:</strong> ${ligue.tel}</p>
          <p><strong>Email:</strong> ${ligue.email}</p>
          <p><strong>Adresse:</strong> ${ligue.adresse}</p>
        </div>
      `;

      marker.bindPopup(popupContent);
    });
  }
}