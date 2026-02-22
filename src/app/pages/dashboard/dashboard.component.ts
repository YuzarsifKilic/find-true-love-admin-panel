import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Dashboard</h1>
          <p class="page-sub">Hoş geldin! İşte genel bakış.</p>
        </div>
      </div>

      @if (loading) {
        <div class="skeleton-grid">
          @for (i of [1,2,3,4]; track i) {
            <div class="skeleton-card"></div>
          }
        </div>
      } @else {
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon" style="background:var(--blue-dim); color:var(--blue)">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/></svg>
            </div>
            <div class="stat-body">
              <span class="stat-value">{{ stats?.totalUsers ?? 0 | number }}</span>
              <span class="stat-label">Toplam Kullanıcı</span>
            </div>
            <div class="stat-trend up">+12%</div>
          </div>

          <div class="stat-card">
            <div class="stat-icon" style="background:var(--accent-dim); color:var(--accent)">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="currentColor"/></svg>
            </div>
            <div class="stat-body">
              <span class="stat-value">{{ stats?.premiumUsers ?? 0 | number }}</span>
              <span class="stat-label">Premium Üye</span>
            </div>
            <div class="stat-trend up">+8%</div>
          </div>

          <div class="stat-card">
            <div class="stat-icon" style="background:var(--red-dim); color:var(--red)">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/></svg>
            </div>
            <div class="stat-body">
              <span class="stat-value">{{ stats?.bannedUsers ?? 0 | number }}</span>
              <span class="stat-label">Banlı Kullanıcı</span>
            </div>
            <div class="stat-trend neutral">—</div>
          </div>

          <div class="stat-card">
            <div class="stat-icon" style="background:var(--orange-dim); color:var(--orange)">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z" fill="currentColor"/></svg>
            </div>
            <div class="stat-body">
              <span class="stat-value">{{ stats?.openReports ?? 0 | number }}</span>
              <span class="stat-label">Açık Rapor</span>
            </div>
            <div class="stat-trend down">-3%</div>
          </div>
        </div>

        <!-- Quick actions -->
        <div class="quick-actions">
          <h3>Hızlı Erişim</h3>
          <div class="actions-grid">
            <a routerLink="/users" class="action-card">
              <div class="action-icon" style="background:var(--blue-dim); color:var(--blue)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/></svg>
              </div>
              <span>Kullanıcıları Yönet</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" fill="currentColor"/></svg>
            </a>
            <a routerLink="/reports" class="action-card">
              <div class="action-icon" style="background:var(--orange-dim); color:var(--orange)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17.3c-.72 0-1.3-.58-1.3-1.3 0-.72.58-1.3 1.3-1.3.72 0 1.3.58 1.3 1.3 0 .72-.58 1.3-1.3 1.3zm1-4.3h-2V7h2v6z" fill="currentColor"/></svg>
              </div>
              <span>Raporları İncele</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" fill="currentColor"/></svg>
            </a>
            <a routerLink="/memberships" class="action-card">
              <div class="action-icon" style="background:var(--accent-dim); color:var(--accent)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="currentColor"/></svg>
              </div>
              <span>Premium Üyeler</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z" fill="currentColor"/></svg>
            </a>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .page { padding: 32px; max-width: 1200px; }
    .page-header { margin-bottom: 32px; }
    .page-title { font-size: 26px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
    .page-sub { font-size: 14px; color: var(--text-secondary); }

    /* Stats */
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; margin-bottom: 32px; }
    .stat-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px; display: flex; align-items: center; gap: 16px;
      transition: var(--transition);
    }
    .stat-card:hover { border-color: var(--border-hover); transform: translateY(-2px); }
    .stat-icon {
      width: 48px; height: 48px; flex-shrink: 0;
      border-radius: var(--radius-sm);
      display: flex; align-items: center; justify-content: center;
    }
    .stat-body { flex: 1; }
    .stat-value { display: block; font-size: 28px; font-weight: 800; color: var(--text-primary); line-height: 1; }
    .stat-label { display: block; font-size: 13px; color: var(--text-secondary); margin-top: 4px; }
    .stat-trend { font-size: 12px; font-weight: 600; padding: 4px 8px; border-radius: 20px; }
    .stat-trend.up { background: var(--green-dim); color: var(--green); }
    .stat-trend.down { background: var(--orange-dim); color: var(--orange); }
    .stat-trend.neutral { background: rgba(255,255,255,0.05); color: var(--text-muted); }

    /* Skeleton */
    .skeleton-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
    .skeleton-card {
      height: 90px; background: var(--bg-card);
      border: 1px solid var(--border); border-radius: var(--radius);
      animation: pulse 1.5s ease-in-out infinite;
    }
    @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.5 } }

    /* Quick actions */
    .quick-actions h3 { font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; }
    .actions-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
    .action-card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 16px 20px;
      display: flex; align-items: center; gap: 12px;
      text-decoration: none; color: var(--text-secondary);
      font-size: 14px; font-weight: 500; transition: var(--transition);
    }
    .action-card:hover { border-color: var(--accent); color: var(--text-primary); transform: translateY(-2px); }
    .action-icon { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .action-card svg:last-child { margin-left: auto; color: var(--text-muted); }
    .action-card:hover svg:last-child { color: var(--accent); }
  `]
})
export class DashboardComponent implements OnInit {
  stats: any;
  loading = true;
  constructor(private admin: AdminService) { }
  ngOnInit() {
    this.admin.getStats().subscribe({
      next: (d) => { this.stats = d; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
