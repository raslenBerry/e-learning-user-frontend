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
      const trainerId = localStorage.getItem('userId'); 
      console.log(trainerId);
      const course = {
        ...this.courseForm.value,
        trainerId: trainerId,
        accepted: 'Pending', // Default value
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

 
}



