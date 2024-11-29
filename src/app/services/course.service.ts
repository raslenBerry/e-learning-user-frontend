import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8080/api/courses'; // URL de votre API backend

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }
  addCourse(course: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, course);
  }

  updateCourse(courseId: string, course: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${courseId}`, course);
  }

  deleteCourse(courseId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${courseId}`);
  }
}
