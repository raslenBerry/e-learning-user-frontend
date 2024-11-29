import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/models/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-manage-courses-trainer',
  templateUrl: './manage-courses-trainer.component.html',
  styleUrls: ['./manage-courses-trainer.component.css']
})
export class ManageCoursesTrainerComponent {


  courses: any[] = [];
  editedCourse: any = {};
  courseForm!: FormGroup;

  constructor(private fb: FormBuilder, private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      field: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const trainerId = localStorage.getItem('userId'); // Fetch trainerId from localStorage
      const course = {
        ...this.courseForm.value,
        trainerId: trainerId,
        accepted: 'NON', // Default value
      };

      this.courseService.addCourse(course).subscribe({
        next: (response) => {
          alert('Course added successfully!');
          this.courseForm.reset();
        },
        error: (err) => {
          console.error(err);
          alert('Failed to add course.');
        },
      });
    }
  }

  UpdateCourse(form: any): void {
    // Update course logic
  }

  Delete(courseId: string): void {
    // Delete course logic
  }

  SearchCourse(query: string): void {
    // Search courses based on query
  }
}



