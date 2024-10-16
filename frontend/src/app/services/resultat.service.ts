import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ResultatService {
  private apiUrl = `${environment.apiUrl}/resultats`; 

  constructor(private http: HttpClient) {}

  // Méthode pour persister un résultat
  createResultat(joueurName: string, totalScore: number): Observable<any> {
    const body = { joueurName, totalScore };
    return this.http.post<any>(this.apiUrl, body);
  }

  getTopResultats(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/top`);
  }

}
