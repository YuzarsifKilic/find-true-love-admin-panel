import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Kullanıcılar</h1>
          <p class="page-sub">Toplam {{ total }} kullanıcı</p>
        </div>
      </div>

      @if (loading) {
        <div class="table-skeleton">
          @for (i of [1,2,3,4,5]; track i) { <div class="skeleton-row"></div> }
        </div>
      } @else {
        <div class="table-card">
          <table class="data-table">
            <thead>
              <tr>
                <th>Kullanıcı</th>
                <th>E-posta</th>
                <th>Üyelik</th>
                <th>Durum</th>
                <th>Kayıt</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              @for (u of users; track u.id) {
                <tr>
                  <td>
                    <div class="user-cell">
                      <div class="avatar" [style.background]="getAvatarBg(u)">
                        {{ (u.firstName || '?')[0] }}
                      </div>
                      <span>{{ u.firstName }} {{ u.lastName }}</span>
                    </div>
                  </td>
                  <td class="text-muted">{{ u.email }}</td>
                  <td>
                    @if (u.membership === 'PREMIUM') {
                      <span class="badge badge-accent">⭐ Premium</span>
                    } @else {
                      <span class="badge badge-muted">Free</span>
                    }
                  </td>
                  <td>
                    @if (u.isBanned) {
                      <span class="badge badge-danger">Banlı</span>
                    } @else {
                      <span class="badge badge-success">Aktif</span>
                    }
                  </td>
                  <td class="text-muted">{{ u.createdDate | date:'dd.MM.yyyy' }}</td>
                  <td>
                    @if (!u.isBanned) {
                      <button class="action-btn danger" (click)="ban(u)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z" fill="currentColor"/></svg>
                        Banla
                      </button>
                    } @else {
                      <button class="action-btn success" (click)="unban(u)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/></svg>
                        Kaldır
                      </button>
                    }
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <div class="pagination">
          <button class="page-btn" [disabled]="page === 0" (click)="prev()">← Önceki</button>
          <span class="page-info">Sayfa {{ page + 1 }}</span>
          <button class="page-btn" [disabled]="(page + 1) * 20 >= total" (click)="next()">Sonraki →</button>
        </div>
      }

      @if (toast) {
        <div class="toast" [class.success]="toastType === 'success'" [class.danger]="toastType === 'danger'">
          {{ toast }}
        </div>
      }
    </div>
  `,
  styles: [`
    .page { padding: 32px; }
    .page-header { margin-bottom: 24px; }
    .page-title { font-size: 26px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
    .page-sub { font-size: 14px; color: var(--text-secondary); }

    .table-card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: var(--radius); overflow: hidden;
    }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th {
      padding: 14px 20px; text-align: left;
      font-size: 11px; font-weight: 600; text-transform: uppercase;
      letter-spacing: 0.08em; color: var(--text-muted);
      border-bottom: 1px solid var(--border);
      background: rgba(255,255,255,0.02);
    }
    .data-table td {
      padding: 14px 20px; font-size: 14px; color: var(--text-primary);
      border-bottom: 1px solid var(--border);
    }
    .data-table tr:last-child td { border-bottom: none; }
    .data-table tr:hover td { background: rgba(255,255,255,0.02); }
    .text-muted { color: var(--text-secondary) !important; }

    .user-cell { display: flex; align-items: center; gap: 10px; }
    .avatar {
      width: 34px; height: 34px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; color: white; flex-shrink: 0;
    }

    .badge {
      display: inline-flex; align-items: center;
      padding: 3px 10px; border-radius: 20px;
      font-size: 12px; font-weight: 600;
    }
    .badge-success { background: var(--green-dim); color: var(--green); }
    .badge-danger { background: var(--red-dim); color: var(--red); }
    .badge-accent { background: var(--accent-dim); color: var(--accent); }
    .badge-muted { background: rgba(255,255,255,0.05); color: var(--text-muted); }

    .action-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 14px; border-radius: var(--radius-sm);
      font-size: 13px; font-weight: 500; font-family: inherit;
      cursor: pointer; border: 1px solid; transition: var(--transition);
    }
    .action-btn.danger { background: var(--red-dim); color: var(--red); border-color: rgba(239,68,68,0.2); }
    .action-btn.danger:hover { background: var(--red); color: white; }
    .action-btn.success { background: var(--green-dim); color: var(--green); border-color: rgba(16,185,129,0.2); }
    .action-btn.success:hover { background: var(--green); color: white; }

    .pagination {
      display: flex; align-items: center; justify-content: center;
      gap: 16px; margin-top: 20px;
    }
    .page-btn {
      background: var(--bg-card); border: 1px solid var(--border);
      color: var(--text-secondary); padding: 8px 16px; border-radius: var(--radius-sm);
      font-size: 13px; font-family: inherit; cursor: pointer; transition: var(--transition);
    }
    .page-btn:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
    .page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
    .page-info { font-size: 13px; color: var(--text-secondary); }

    /* Skeleton */
    .table-skeleton { display: flex; flex-direction: column; gap: 8px; }
    .skeleton-row {
      height: 60px; background: var(--bg-card);
      border: 1px solid var(--border); border-radius: var(--radius);
      animation: pulse 1.5s ease-in-out infinite;
    }
    @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }

    /* Toast */
    .toast {
      position: fixed; bottom: 24px; right: 24px;
      padding: 14px 20px; border-radius: var(--radius-sm);
      font-size: 14px; font-weight: 500;
      animation: slideIn 0.3s ease;
      border: 1px solid;
    }
    .toast.success { background: var(--green-dim); color: var(--green); border-color: rgba(16,185,129,0.2); }
    .toast.danger { background: var(--red-dim); color: var(--red); border-color: rgba(239,68,68,0.2); }
    @keyframes slideIn { from { transform: translateY(20px); opacity:0 } to { transform: translateY(0); opacity:1 } }
  `]
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  total = 0;
  page = 0;
  loading = true;
  toast = '';
  toastType = 'success';

  private avatarColors = ['#e91e8c', '#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  constructor(private admin: AdminService) { }
  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.admin.getUsers(this.page).subscribe({
      next: (r) => { this.users = r.users; this.total = r.total; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  getAvatarBg(u: any) {
    const code = (u.firstName || 'A').charCodeAt(0);
    return this.avatarColors[code % this.avatarColors.length];
  }

  ban(u: any) {
    this.admin.banUser(u.id).subscribe(() => {
      u.isBanned = true;
      this.showToast(`${u.firstName} banlandı`, 'danger');
    });
  }

  unban(u: any) {
    this.admin.unbanUser(u.id).subscribe(() => {
      u.isBanned = false;
      this.showToast(`${u.firstName} banı kaldırıldı`, 'success');
    });
  }

  prev() { this.page--; this.load(); }
  next() { this.page++; this.load(); }

  showToast(msg: string, type: string) {
    this.toast = msg; this.toastType = type;
    setTimeout(() => this.toast = '', 3000);
  }
}
