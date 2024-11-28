import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token = '';
  newPassword = '';
  confirmPassword = '';
  errorMessage = '';
  isFormValid = false;

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router , private toastr : ToastrService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
    });
  }

  // Validate form fields
  validateForm(): void {
    if (this.newPassword && this.confirmPassword) {
      // Check if passwords match and if the new password meets the required length
      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match.';
        this.isFormValid = false;
      } else if (this.newPassword.length < 8) {
        this.errorMessage = 'Password must be at least 8 characters long.';
        this.isFormValid = false;
      } else {
        this.errorMessage = ''; // Clear the error message if validation is correct
        this.isFormValid = true;
      }
    } else {
      this.isFormValid = false;
    }
  }

  onSubmit(): void {
    if (this.isFormValid) {
      this.authService.resetPassword(this.token, this.newPassword).subscribe({
        next: () => {
          this.toastr.success('Password reset successfully!' , 'Success')
          this.router.navigate(['/login']); 
        },
        error: () => this.toastr.error('Error resetting password! Try again.' , 'Error')

      });
    }
  }
}
