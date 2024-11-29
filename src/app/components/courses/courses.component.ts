import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit{
  courses: any[] = []; // Tableau pour stocker les cours

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(
      (data) => {
        this.courses = data; // Stocker les données des cours
      },
      (error) => {
        console.error('Erreur lors de la récupération des cours :', error);
      }
    );
  }

}
