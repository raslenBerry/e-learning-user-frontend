import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  private apiUrl = 'http://localhost:8080/api/chapters'; // Update with your API URL

  constructor(private http: HttpClient) {}

  getChaptersByCourseId(courseId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/course/${courseId}`);
  }

  addChapter(chapter: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, chapter);
  }
}