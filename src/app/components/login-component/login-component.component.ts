import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule], // Add ReactiveFormsModule here
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css'] // Corrected to styleUrls
})
export class LoginComponentComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  async Login() {
    console.log("Login method called");
  
    if (this.loginForm.valid) { 
      console.log("Form is valid");
      try {
        await this.authService.Login(this.loginForm.value);
        console.log("Login successful, navigating to home");
        this.router.navigate(['/home']); // Navigate to the home page after a successful login
      } catch (error) {
        console.error("Login error:", error); // Log the error to console
        this.errorMessage = 'خطأ في تسجيل الدخول. حاول مرة أخرى.'; // Display an error message
      }
    } else {
      console.log("Form is invalid", this.loginForm.errors);
    }
  }
}


