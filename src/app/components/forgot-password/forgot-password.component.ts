import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email = '';
  isButtonDisabled = false;
  countdown = 30; // 30 seconds countdown
  timer: any;

  constructor(private authService: AuthService , private toastr : ToastrService) {}

  onSubmit(): void {
    this.authService.forgotPassword(this.email).subscribe({
      next: (response) => {
        this.toastr.success('Password reset email sent! Check your inbox' , 'Success')

        this.startCountdown(); // Start the countdown after email is sent
      },
      error: (error) => {
       
        this.toastr.error('Error sending password reset email! Try again.' , 'Error')

      },
    });
  }

  startCountdown(): void {
    this.isButtonDisabled = true;
    this.timer = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        this.resetTimer();
      }
    }, 1000);
  }

  resetTimer(): void {
    clearInterval(this.timer);
    this.isButtonDisabled = false;
    this.countdown = 30; // Reset to initial value
  }
}
