import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private apiUrl = `${environment.apiUrl}/scores`;

  constructor(private http: HttpClient) {}

  getScoresByPlayerId(playerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/player/${playerId}`);
  }

  getAllScores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}