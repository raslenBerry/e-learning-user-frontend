import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface GoogleLoginResponse {
  token: string;
  [key: string]: any; // Optional, for any additional properties in the response
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080'; // Update with your backend API URL
  private token: string | null = null;
  private roleSubject = new BehaviorSubject<string | null>(null);
  public role$ = this.roleSubject.asObservable();
  private userSubject = new BehaviorSubject<any>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Check if there is a token in localStorage on app start
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      this.token = storedToken;
      this.setRoleFromToken();
    }

    const userData = localStorage.getItem('user');
    if (userData) {
      this.userSubject.next(JSON.parse(userData));
    }
  }

  // Login method to return Observable and handle token and role management
  login(email: string, password: string): Observable<{ token: string; role: string }> {
    return this.http.post<{ token: string; role: string }>(`${this.apiUrl}/api/auth/login`, { email, password })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('user', JSON.stringify(response));
          this.token = response.token;
          this.roleSubject.next(response.role);
        }),
        catchError(error => {
          console.error('Login error', error);
          throw error;
        })
      );
  }

  // Register method to return an Observable
  register(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/auth/register`, user)
      .pipe(
        catchError(error => {
          console.error('Register error', error);
          throw error;
        })
      );
  }

  // Logout method to clear the token and role from localStorage and BehaviorSubject
  logout(): void {
    this.token = null;
    localStorage.removeItem('token'); // Remove token from storage
    this.roleSubject.next(null); // Clear role
    localStorage.removeItem('role'); // Remove role from storage
    localStorage.removeItem('user'); // Remove user data from storage
    this.router.navigate(['/login']);
  }

  // Method to check if the user is logged in by checking token in localStorage
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  // Retrieve the token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Set the role based on token (you can modify this to decode the JWT if needed)
  private setRoleFromToken(): void {
    const token = this.getToken();
    if (token) {
      const payload = this.decodeJwt(token); // Decode the JWT to get user info (role, expiration, etc.)
      this.roleSubject.next(payload?.role || null); // Set the role in the BehaviorSubject
    }
  }

  // Decoding JWT (Optional) - for extracting user role or other information
  private decodeJwt(token: string): any {
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = parts[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    }
    return null;
  }

  // Get headers with Authorization token if available
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  // Forgot password API call
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/forgot-password`, null, {
      params: { email },
      responseType: 'text', // Set response type to 'text'
    });
  }

  // Reset password API call
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/reset-password`, null, {
      params: { token, newPassword },
      responseType: 'text',
    });
  }

  // Google login
  googleLogin(credential: string): Observable<GoogleLoginResponse> {
    console.log('Sending Google credential to backend');
    return this.http.post<GoogleLoginResponse>(`${this.apiUrl}/api/auth/google/callback`, credential)
      .pipe(
        tap(response => {
          console.log('Google login response:', response);
          if (response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response));
            this.userSubject.next(response);
          }
        }),
        catchError(error => {
          console.error('Google login error', error);
          throw error;
        })
      );
  }

  handleGoogleSuccess(response: GoogleLoginResponse): void {
    if (response.token) {
      localStorage.setItem('token', response.token);
      this.token = response.token;
      this.router.navigate(['/home']);
    }
  }

  // Get all users
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/users/all`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error fetching all users', error);
          throw error;
        })
      );
  }

  // Update user
  // Inside AuthService

updateUser(user: any): Observable<any> {
  const token = this.getToken(); // Retrieve token from localStorage for authentication

  return this.http.put<any>(`${this.apiUrl}/api/users/update`, user, {
    headers: this.getAuthHeaders() // Add Authorization header with token
  }).pipe(
    catchError(error => {
      console.error('Error updating user:', error);
      throw error;
    })
  );
}


  // Delete user
  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/api/users/delete/${userId}`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(error => {
          console.error('Error deleting user', error);
          throw error;
        })
      );
  }

}
