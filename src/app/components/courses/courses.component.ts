import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: any[] = [];
  isLoading = true;
  error: string | null = null;
  selectedCourse: string | null = null;
 
  
  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    
    if (email) {
      // Récupérer les cours recommandés si l'utilisateur est connecté
      this.courseService.getRecommendedCourses(email).subscribe({
        next: (data) => {
          this.courses = data.filter(course => course.accepted === 'Accepted');
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching recommended courses:', error);
          this.error = 'Unable to load courses';
          this.isLoading = false;
          
          // En cas d'erreur, charger tous les cours
          this.loadAllCourses();
        }
      });
    } else {
      // Charger tous les cours si pas d'utilisateur connecté
      this.loadAllCourses();
    }
  }

  private loadAllCourses(): void {
    this.courseService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data.filter(course => course.accepted === 'Accepted');
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
        this.error = 'Unable to load courses';
        this.isLoading = false;
      }
    });
  }

  
  }
  
  
  
