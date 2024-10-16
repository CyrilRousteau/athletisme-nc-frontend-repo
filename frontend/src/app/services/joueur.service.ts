import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {
  private apiUrl = `${environment.apiUrl}/joueurs`;

  constructor(private http: HttpClient) {}

  getJoueurById(playerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${playerId}`);
  }
}