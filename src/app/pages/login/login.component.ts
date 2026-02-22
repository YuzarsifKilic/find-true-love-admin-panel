import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule, MatCardModule,
        MatFormFieldModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule],
    template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <div class="logo">
            <mat-icon>favorite</mat-icon>
            <h1>Admin Panel</h1>
            <p>Find True Love Thailand</p>
          </div>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>E-posta</mat-label>
              <input matInput type="email" formControlName="email" placeholder="admin@findtruelove.com">
              <mat-icon matSuffix>email</mat-icon>
            </mat-form-field>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Şifre</mat-label>
              <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
              <button mat-icon-button matSuffix type="button" (click)="hidePassword = !hidePassword">
                <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
              </button>
            </mat-form-field>
            @if (error) {
              <p class="error-msg">{{ error }}</p>
            }
            <button mat-raised-button color="primary" class="full-width login-btn" type="submit" [disabled]="loading || form.invalid">
              @if (loading) {
                <mat-spinner diameter="20"></mat-spinner>
              } @else {
                Giriş Yap
              }
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
    styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    }
    .login-card {
      width: 400px;
      padding: 32px;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.5);
    }
    .logo {
      text-align: center;
      width: 100%;
      margin-bottom: 24px;
    }
    .logo mat-icon { font-size: 48px; height: 48px; width: 48px; color: #e91e63; }
    .logo h1 { margin: 8px 0 4px; font-size: 24px; font-weight: 700; }
    .logo p { margin: 0; color: #888; font-size: 13px; }
    .full-width { width: 100%; margin-bottom: 12px; }
    .login-btn { height: 48px; font-size: 16px; margin-top: 8px; }
    .error-msg { color: #f44336; font-size: 13px; margin: -4px 0 8px; }
    mat-spinner { margin: auto; }
  `]
})
export class LoginComponent {
    form: FormGroup;
    loading = false;
    error = '';
    hidePassword = true;

    constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
        if (this.auth.isLoggedIn()) this.router.navigate(['/dashboard']);
    }

    onSubmit(): void {
        if (this.form.invalid) return;
        this.loading = true;
        this.error = '';
        const { email, password } = this.form.value;
        this.auth.login(email, password).subscribe({
            next: () => { this.loading = false; this.router.navigate(['/dashboard']); },
            error: () => { this.loading = false; this.error = 'Geçersiz e-posta veya şifre'; }
        });
    }
}
