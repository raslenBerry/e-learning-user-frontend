import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userRole: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Initialize AOS for animations
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });

    // Subscribe to userRole changes
    this.authService.userRole$.subscribe((role) => {
      this.userRole = role;
      console.log('User role updated:', this.userRole);
    });
  }
}
