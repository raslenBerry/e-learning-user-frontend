import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare const google: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginAttempts: number = 0;
  isLoginDisabled: boolean = false;
  remainingSeconds: number = 30;
  countdownInterval: any;
  isGoogleLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Load Google Sign-In script dynamically
    this.loadGoogleSignInScript();
  }

  private loadGoogleSignInScript(): void {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      this.initializeGoogleSignIn();
    };
    document.body.appendChild(script);
  }

  private initializeGoogleSignIn(): void {
    if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
      try {
        google.accounts.id.initialize({
          client_id: '919484669343-m7la8vg0p3l2t3jbakl4s9q8ojv1fkjm.apps.googleusercontent.com',
          callback: this.handleCredentialResponse.bind(this),
          auto_select: false,
          cancel_on_tap_outside: true,
          context: 'signup'
        });

        const googleBtnElement = document.getElementById('googleBtn');
        if (googleBtnElement) {
          google.accounts.id.renderButton(
            googleBtnElement,
            {
              theme: 'outline',
              size: 'large',
              width: '100%',
              text: 'signup_with',
              locale: 'en'
            }
          );
        } else {
          console.error('Google button element not found');
        }
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
      }
    } else {
      console.error('Google Sign-In API not loaded properly');
    }
  }

  private handleCredentialResponse(response: any): void {
    if (!response.credential) {
      this.toastr.error('Google sign-in failed. Missing credential.');
      return;
    }

    this.isGoogleLoading = true;
    console.log('Google Sign-In Response:', response);

    this.authService.googleLogin(response.credential).subscribe({
      next: (res: any) => {
        console.log('Google registration successful:', res);
        localStorage.setItem('email', res.user.email);

        if (res && res.token) {
          localStorage.setItem('token', res.token);
          if (res.user) {
            localStorage.setItem('user', JSON.stringify(res.user));
          }

          this.toastr.success('Successfully registered with Google!');
          
          // Check user role and navigate accordingly
          const role = res.user?.role;
          if (role === 'STUDENT') {
            this.router.navigate(['/home']);
          } else if (role === 'TRAINER') {
            this.router.navigate(['/trainer-home']);
          } else {
            this.router.navigate(['/moreinfos']);
          }

        } else {
          this.toastr.error('Invalid response from server');
        }
      },
      error: (error) => {
        console.error('Google registration failed:', error);
        this.toastr.error(error.error?.message || 'Failed to register with Google. Please try again.');
        this.isGoogleLoading = false;
      },
      complete: () => {
        this.isGoogleLoading = false;
      }
    });
}
onSubmit(): void {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe(
      (response) => {
        this.toastr.success('Login successful!', 'Success');

        // Stockage du token
        const token = response.token;
        localStorage.setItem('token', token);

        // Vérifiez le rôle directement dans la réponse
        const role = response.role;
        console.log(role) // Récupérez le rôle ici

        if (role) {
          switch (role) {
            case 'STUDENT':
              this.router.navigate(['/home']);
              break;
            case 'TRAINER':
              this.router.navigate(['/trainer-home']);
              break;
            case 'ADMIN':
              this.router.navigate(['/dashboard']);
              break;
            default:
              this.router.navigate(['/dashboard']);
              break;
          }
        } else {
          this.toastr.error('Role not provided. Redirecting to dashboard.', 'Error');
          this.router.navigate(['/dashboard']);
        }

        this.resetLoginAttempts();
      },
      (error) => {
        this.loginAttempts++;
        const remainingAttempts = 3 - this.loginAttempts;

        if (remainingAttempts > 0) {
          this.toastr.error(`Login failed! You have ${remainingAttempts} attempts left.`, 'Error');
        }

        if (this.loginAttempts >= 3) {
          this.blockLogin();
        }
      }
    );
  }
}

  blockLogin(): void {
    this.isLoginDisabled = true;
    this.toastr.error('Too many failed attempts. You are blocked for 30 seconds.', 'Error');
    this.startCountdown();
  }

  startCountdown(): void {
    this.remainingSeconds = 30;
    this.countdownInterval = setInterval(() => {
      this.remainingSeconds--;
      if (this.remainingSeconds === 0) {
        this.isLoginDisabled = false;
        this.resetLoginAttempts();
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  resetLoginAttempts(): void {
    this.loginAttempts = 0;
    this.isLoginDisabled = false;
  }
}
