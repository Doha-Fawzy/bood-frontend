import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { username: '', password: '' };
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/admin/services']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Invalid username or password';
        console.error('Login error', err);
      }
    });
  }
}
