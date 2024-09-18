import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private apiUrl = 'http://localhost:3001/api/scores/player';

  constructor(private http: HttpClient) { }

  getScoresByPlayerId(playerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${playerId}`);
  }
}
