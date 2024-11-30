import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { ToastrService } from 'ngx-toastr';
import { Course } from 'src/app/models/course';
@Component({
  selector: 'app-trainer-home',
  templateUrl: './trainer-home.component.html',
  styleUrls: ['./trainer-home.component.css']
})
export class TrainerHomeComponent implements OnInit {


  courses: Course[] = [];
  editedCourse: Partial<Course> = {};  // For editing
  searchTerm: string = '';

  courseForm!: FormGroup;

  constructor(private fb: FormBuilder, private courseService: CourseService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getCoursesByIdTrainer();
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      field: ['', Validators.required],
      image: ['', Validators.required],
    });
  }


// Fetch all courses and filter by trainerId from localStorage
public getCoursesByIdTrainer(): void {
  // Get the trainer ID from localStorage
  const trainerId = localStorage.getItem('userId');  // Assuming 'idTrainer' is stored in localStorage

  if (!trainerId) {
    this.toastr.error('Trainer ID not found in localStorage', 'Error');
    return;
  }

  this.courseService.getAllCourses().subscribe(
    (response: Course[]) => {
      // Filter courses where the trainerId matches the one from localStorage
      this.courses = response.filter(course => course.trainerId === trainerId);

      if (this.courses.length === 0) {
        this.toastr.info('No courses found for this trainer', 'Info');
      }
    },
    (error) => {
      this.toastr.error('Error fetching courses', 'Error');
    }
  );
}


  // Delete a course
  public deleteCourse(courseId: string): void {
    this.courseService.deleteCourse(courseId).subscribe(
      () => {
        this.toastr.success('Course deleted successfully', 'Success');
        this.getCoursesByIdTrainer();  // Refresh the list
      },
      (error) => {
        this.toastr.error('Error deleting course', 'Error');
      }
    );
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      const trainerId = localStorage.getItem('userId'); // Fetch trainerId from localStorage
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

  // Set course to be updated
  public displayUpdate(course: Course): void {
    this.editedCourse = { ...course };
  }

  // Update a course
  public updateCourse(form: NgForm): void {
    if (this.editedCourse.courseId) {
      this.courseService.updateCourse(this.editedCourse.courseId, this.editedCourse as Course).subscribe(
        () => {
          this.toastr.success('Course updated successfully', 'Success');
          this.getCoursesByIdTrainer();  // Refresh the list
        },
        (error) => {
          this.toastr.error('Error updating course', 'Error');
        }
      );
    }
  }

   // Search for courses based on name or field
   public searchCourses(searchTerm: string): void {
    if (searchTerm.trim() === '') {
      this.getCoursesByIdTrainer();  // If search is empty, show all courses
      return;
    }

    this.courseService.getAllCourses().subscribe((courses: Course[]) => {
      this.courses = courses.filter(
        (course) =>
        course.trainerId === localStorage.getItem('userId') &&
          course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.field.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }
}







