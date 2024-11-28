import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  selectedRole: 'STUDENT' | 'TRAINER' = 'STUDENT';
  

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{8,15}$/)]],
      universityName: [''],
      fieldOfStudy: [''],
      level: [''],
      speciality: [''],
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
   

 
  
  
  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = { ...this.registerForm.value, role: this.selectedRole };
      
      this.authService.register(formData).subscribe({
        next: () => {
          this.toastr.success('Registration successful!');
          localStorage.setItem('email', formData.email);
      
          if( this.selectedRole=="STUDENT"){this.router.navigate(['/interest']);}
          else this.router.navigate(['/login'])
          
        },
        error: (error) => {
          this.toastr.error(error.error?.message || 'Registration failed. Please try again.');
          console.error('Registration error:', error);
        }
      });
    } else {
      this.toastr.error('Please fill in all required fields correctly.');
    }
  }
  
  selectRole(role: 'STUDENT' | 'TRAINER'): void {
    this.selectedRole = role;
  }
}