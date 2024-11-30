import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-trainer-header',
  templateUrl: './trainer-header.component.html',
  styleUrls: ['./trainer-header.component.css']
})
export class TrainerHeaderComponent {
  constructor(private authService:  AuthService) {}

  logout() {
    this.authService.logout();
  }
}
