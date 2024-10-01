import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {
  private apiUrl = 'http://localhost:3001/api/joueurs';

  constructor(private http: HttpClient) {}

  getJoueurById(playerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${playerId}`);
  }
}