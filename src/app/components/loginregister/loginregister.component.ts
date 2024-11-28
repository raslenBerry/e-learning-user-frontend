import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loginregister',
  templateUrl: './loginregister.component.html',
  styleUrls: ['./loginregister.component.css'],
})
export class LoginRegisterComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  selectedRole: 'STUDENT' | 'TRAINER' = 'STUDENT'; // Default role

  

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr : ToastrService
  ) {
    // Initialize login form group
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // Initialize register form group
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{8,15}$/)]],
      universityName: [''], // Student-specific
      fieldOfStudy: [''],   // Student-specific
      level: [''],          // Student-specific
      speciality: [''],     // Trainer-specific
    });
  }

  ngOnInit(): void {
    this.updateValidators();
  }

  selectRole(role: 'STUDENT' | 'TRAINER'): void {
    this.selectedRole = role;
    this.updateValidators();
  }

  updateValidators(): void {
    if (this.selectedRole === 'STUDENT') {
      this.registerForm.get('universityName')?.setValidators([Validators.required]);
      this.registerForm.get('fieldOfStudy')?.setValidators([Validators.required]);
      this.registerForm.get('level')?.setValidators([Validators.required]);
      this.registerForm.get('speciality')?.clearValidators();
    } else {
      this.registerForm.get('speciality')?.setValidators([Validators.required]);
      this.registerForm.get('universityName')?.clearValidators();
      this.registerForm.get('fieldOfStudy')?.clearValidators();
      this.registerForm.get('level')?.clearValidators();
    }

    this.registerForm.get('universityName')?.updateValueAndValidity();
    this.registerForm.get('fieldOfStudy')?.updateValueAndValidity();
    this.registerForm.get('level')?.updateValueAndValidity();
    this.registerForm.get('speciality')?.updateValueAndValidity();
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/home']);
        },
        (error) => console.error('Login failed', error)
      );
    }
  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      const formData = { ...this.registerForm.value, role: this.selectedRole };
      
      this.authService.register(formData).subscribe({
        next: () => {
          this.toastr.success('Registration successful!');
          localStorage.setItem('email', formData.email);
          this.router.navigate(['/interest']);
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
  
}