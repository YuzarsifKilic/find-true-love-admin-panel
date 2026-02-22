import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-wrap">
      <!-- Background orbs -->
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>

      <div class="login-card">
        <!-- Logo -->
        <div class="brand">
          <div class="brand-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#e91e8c"/>
            </svg>
          </div>
          <div>
            <h1>Find True Love</h1>
            <p>Admin Panel</p>
          </div>
        </div>

        <div class="login-body">
          <h2>Hoş Geldiniz</h2>
          <p class="subtitle">Yönetim panelinize giriş yapın</p>

          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="field-group">
              <label>E-posta</label>
              <div class="input-wrap" [class.focused]="emailFocused" [class.error]="error">
                <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                </svg>
                <input type="email" formControlName="email" placeholder="admin@findtruelove.com"
                  (focus)="emailFocused=true" (blur)="emailFocused=false">
              </div>
            </div>

            <div class="field-group">
              <label>Şifre</label>
              <div class="input-wrap" [class.focused]="passFocused" [class.error]="error">
                <svg class="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="currentColor"/>
                </svg>
                <input [type]="showPass ? 'text' : 'password'" formControlName="password" placeholder="••••••••"
                  (focus)="passFocused=true" (blur)="passFocused=false">
                <button type="button" class="toggle-pass" (click)="showPass=!showPass">
                  @if (showPass) {
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/></svg>
                  } @else {
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor"/></svg>
                  }
                </button>
              </div>
            </div>

            @if (error) {
              <div class="error-msg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/></svg>
                {{ error }}
              </div>
            }

            <button type="submit" class="login-btn" [class.loading]="loading" [disabled]="loading || form.invalid">
              @if (loading) {
                <span class="spinner"></span>
                <span>Giriş yapılıyor...</span>
              } @else {
                <span>Giriş Yap</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-wrap {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-primary);
      position: relative;
      overflow: hidden;
    }
    .orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
    }
    .orb-1 {
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(233,30,140,0.12) 0%, transparent 70%);
      top: -150px; right: -100px;
    }
    .orb-2 {
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%);
      bottom: -100px; left: -100px;
    }
    .login-card {
      width: 420px;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 20px;
      overflow: hidden;
      position: relative;
      z-index: 1;
      box-shadow: 0 24px 80px rgba(0,0,0,0.5);
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 28px 32px 24px;
      border-bottom: 1px solid var(--border);
      background: linear-gradient(135deg, rgba(233,30,140,0.05), rgba(124,58,237,0.05));
    }
    .brand-icon {
      width: 48px; height: 48px;
      background: var(--accent-dim);
      border: 1px solid rgba(233,30,140,0.2);
      border-radius: 12px;
      display: flex; align-items: center; justify-content: center;
    }
    .brand h1 {
      font-size: 16px; font-weight: 700;
      color: var(--text-primary); margin: 0 0 2px;
    }
    .brand p {
      font-size: 12px; color: var(--text-secondary); margin: 0;
      text-transform: uppercase; letter-spacing: 0.08em;
    }
    .login-body { padding: 32px; }
    .login-body h2 {
      font-size: 22px; font-weight: 700;
      color: var(--text-primary); margin: 0 0 6px;
    }
    .subtitle { font-size: 14px; color: var(--text-secondary); margin: 0 0 28px; }
    .field-group { margin-bottom: 20px; }
    .field-group label {
      display: block; font-size: 13px; font-weight: 500;
      color: var(--text-secondary); margin-bottom: 8px;
    }
    .input-wrap {
      display: flex; align-items: center; gap: 10px;
      background: var(--bg-secondary);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 0 14px;
      transition: var(--transition);
    }
    .input-wrap.focused { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-dim); }
    .input-wrap.error { border-color: var(--red); }
    .input-icon { color: var(--text-muted); flex-shrink: 0; }
    .input-wrap input {
      flex: 1; background: none; border: none; outline: none;
      color: var(--text-primary); font-size: 14px; font-family: inherit;
      padding: 13px 0;
    }
    .input-wrap input::placeholder { color: var(--text-muted); }
    .toggle-pass {
      background: none; border: none; cursor: pointer;
      color: var(--text-muted); display: flex; align-items: center;
      padding: 4px; border-radius: 4px; transition: var(--transition);
    }
    .toggle-pass:hover { color: var(--text-secondary); }
    .error-msg {
      display: flex; align-items: center; gap: 8px;
      color: var(--red); font-size: 13px;
      background: var(--red-dim); border: 1px solid rgba(239,68,68,0.2);
      border-radius: var(--radius-sm); padding: 10px 14px;
      margin-bottom: 20px;
    }
    .login-btn {
      width: 100%; padding: 14px 20px;
      background: linear-gradient(135deg, var(--accent), #c2185b);
      color: white; border: none; border-radius: var(--radius-sm);
      font-size: 15px; font-weight: 600; font-family: inherit;
      cursor: pointer; display: flex; align-items: center;
      justify-content: center; gap: 8px;
      transition: var(--transition); margin-top: 8px;
      box-shadow: 0 4px 20px var(--accent-glow);
    }
    .login-btn:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 6px 28px var(--accent-glow);
    }
    .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
    .spinner {
      width: 18px; height: 18px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white; border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  error = '';
  showPass = false;
  emailFocused = false;
  passFocused = false;

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
