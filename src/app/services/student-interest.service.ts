import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentInterestService {

  private apiUrl = 'http://localhost:8080/api/interests/save';

  constructor(private http: HttpClient) { }

  saveInterests(email: string, interests: string[]): Observable<any> {
    const body = { email, interests };
    return this.http.post<any>(this.apiUrl, body);
  }
}