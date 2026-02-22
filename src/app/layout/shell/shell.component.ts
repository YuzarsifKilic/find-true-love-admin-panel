import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="shell">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-brand">
          <div class="brand-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#e91e8c"/>
            </svg>
          </div>
          <div class="brand-text">
            <span class="brand-name">Find True Love</span>
            <span class="brand-sub">Admin Panel</span>
          </div>
        </div>

        <nav class="sidebar-nav">
          <div class="nav-section-label">Ana Menü</div>
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill="currentColor"/>
            </svg>
            <span>Dashboard</span>
          </a>
          <a routerLink="/users" routerLinkActive="active" class="nav-item">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>
            </svg>
            <span>Kullanıcılar</span>
          </a>
          <a routerLink="/reports" routerLinkActive="active" class="nav-item">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z" fill="currentColor"/>
            </svg>
            <span>Raporlar</span>
            @if (openReports > 0) {
              <span class="badge">{{ openReports }}</span>
            }
          </a>
          <a routerLink="/memberships" routerLinkActive="active" class="nav-item">
            <svg class="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="currentColor"/>
            </svg>
            <span>Üyelikler</span>
          </a>
        </nav>

        <div class="sidebar-footer">
          <div class="user-info">
            <div class="user-avatar">A</div>
            <div class="user-details">
              <span class="user-name">Admin</span>
              <span class="user-role">Administrator</span>
            </div>
          </div>
          <button class="logout-btn" (click)="logout()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </aside>

      <!-- Content -->
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .shell { display: flex; height: 100vh; overflow: hidden; }

    /* ── Sidebar ── */
    .sidebar {
      width: var(--sidebar-width); flex-shrink: 0;
      background: var(--bg-secondary);
      border-right: 1px solid var(--border);
      display: flex; flex-direction: column;
      overflow: hidden;
    }
    .sidebar-brand {
      display: flex; align-items: center; gap: 12px;
      padding: 20px 20px 20px;
      border-bottom: 1px solid var(--border);
    }
    .brand-logo {
      width: 38px; height: 38px; flex-shrink: 0;
      background: var(--accent-dim);
      border: 1px solid rgba(233,30,140,0.2);
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
    }
    .brand-name { display: block; font-size: 13px; font-weight: 700; color: var(--text-primary); }
    .brand-sub { display: block; font-size: 11px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; }

    /* ── Nav ── */
    .sidebar-nav { flex: 1; padding: 16px 12px; overflow-y: auto; }
    .nav-section-label {
      font-size: 10px; font-weight: 600; color: var(--text-muted);
      text-transform: uppercase; letter-spacing: 0.1em;
      padding: 0 8px; margin-bottom: 8px;
    }
    .nav-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 12px; border-radius: var(--radius-sm);
      color: var(--text-secondary); text-decoration: none;
      font-size: 14px; font-weight: 500;
      transition: var(--transition); position: relative;
      margin-bottom: 2px;
    }
    .nav-item:hover {
      background: rgba(255,255,255,0.04);
      color: var(--text-primary);
    }
    .nav-item.active {
      background: var(--accent-dim);
      color: var(--accent);
      border: 1px solid rgba(233,30,140,0.15);
    }
    .nav-icon { flex-shrink: 0; }
    .badge {
      margin-left: auto;
      background: var(--accent);
      color: white; font-size: 10px; font-weight: 700;
      padding: 2px 6px; border-radius: 20px; line-height: 1.4;
    }

    /* ── Footer ── */
    .sidebar-footer {
      padding: 16px 12px;
      border-top: 1px solid var(--border);
      display: flex; align-items: center; gap: 10px;
    }
    .user-info { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
    .user-avatar {
      width: 34px; height: 34px; flex-shrink: 0;
      background: linear-gradient(135deg, var(--accent), var(--purple));
      border-radius: 50%; display: flex; align-items: center;
      justify-content: center; font-size: 13px; font-weight: 700; color: white;
    }
    .user-name { display: block; font-size: 13px; font-weight: 600; color: var(--text-primary); }
    .user-role { display: block; font-size: 11px; color: var(--text-muted); }
    .logout-btn {
      background: none; border: 1px solid var(--border); border-radius: var(--radius-sm);
      padding: 8px; cursor: pointer; color: var(--text-muted);
      display: flex; align-items: center;
      transition: var(--transition); flex-shrink: 0;
    }
    .logout-btn:hover { border-color: var(--red); color: var(--red); background: var(--red-dim); }

    /* ── Main ── */
    .main-content {
      flex: 1; overflow-y: auto;
      background: var(--bg-primary);
    }
  `]
})
export class ShellComponent {
  openReports = 0;
  constructor(private auth: AuthService) { }
  logout() { this.auth.logout(); }
}
