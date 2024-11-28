import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-moreinfos',
  templateUrl: './moreinfos.component.html',
  styleUrls: ['./moreinfos.component.css']
})
export class MoreInfosComponent implements OnInit {
  moreinfos: FormGroup;
  selectedRole: string = '';
  isGoogleLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    // Initialize form
    this.moreinfos = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      universityName: [''],
      fieldOfStudy: [''],
      level: [''],
      speciality: ['']
    });
  }

  ngOnInit(): void {
    // Load user data from localStorage if available
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData) {
      this.selectedRole = userData.role || '';
      this.populateForm(userData);
    }
  }

  // Populate form with user data
  populateForm(user: any): void {
    if (user.phoneNumber) this.moreinfos.get('phoneNumber')?.setValue(user.phoneNumber);
    if (user.universityName) this.moreinfos.get('universityName')?.setValue(user.universityName);
    if (user.fieldOfStudy) this.moreinfos.get('fieldOfStudy')?.setValue(user.fieldOfStudy);
    if (user.level) this.moreinfos.get('level')?.setValue(user.level);
    if (user.speciality) this.moreinfos.get('speciality')?.setValue(user.speciality);

    // Set the role if available
    if (user.role) {
      this.selectRole(user.role);
    }
  }

  // Handle role selection and update the form validation dynamically
  selectRole(role: string): void {
    this.selectedRole = role;
    
    // Update the role in localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    userData.role = role;
    localStorage.setItem('user', JSON.stringify(userData));

    // Adjust validation based on role
    if (role === 'STUDENT') {
      this.moreinfos.get('universityName')?.setValidators(Validators.required);
      this.moreinfos.get('fieldOfStudy')?.setValidators(Validators.required);
      this.moreinfos.get('level')?.setValidators(Validators.required);
      this.moreinfos.get('speciality')?.clearValidators(); // Remove validators for trainers
    } else if (role === 'TRAINER') {
      this.moreinfos.get('speciality')?.setValidators(Validators.required);
      this.moreinfos.get('universityName')?.clearValidators();
      this.moreinfos.get('fieldOfStudy')?.clearValidators();
      this.moreinfos.get('level')?.clearValidators();
    }
    
    // Update form validation
    this.moreinfos.get('universityName')?.updateValueAndValidity();
    this.moreinfos.get('fieldOfStudy')?.updateValueAndValidity();
    this.moreinfos.get('level')?.updateValueAndValidity();
    this.moreinfos.get('speciality')?.updateValueAndValidity();
  }

  // Handle form submission
  onSubmit(): void {
    if (this.moreinfos.valid) {
      const updatedUser = { ...JSON.parse(localStorage.getItem('user') || '{}'), ...this.moreinfos.value };
    
      this.authService.updateUser(updatedUser).subscribe({
        next: (response) => {
          this.toastr.success('Profile updated successfully!', 'Success');
          // After successful update, navigate based on role
          if (updatedUser.role === 'STUDENT') {
            this.router.navigate(['/interest']);
          } else if (updatedUser.role === 'TRAINER') {
            this.router.navigate(['/trainer-home']);
          }
        },
        error: (error) => {
          this.toastr.error('Failed to update profile. Please try again.', 'Error');
        }
      });
    }
  }
}
