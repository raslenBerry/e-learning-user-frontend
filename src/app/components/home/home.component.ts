// src/app/home/home.component.ts

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AboutUsComponent } from "../about-us/about-us.component";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent {
  constructor(private authService:  AuthService) {}

  logout() {
    this.authService.logout();
  }
}
