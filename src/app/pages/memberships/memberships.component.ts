import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-memberships',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Premium Üyelikler</h1>
          <p class="page-sub">Toplam {{ total }} premium üye</p>
        </div>
        <div class="total-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="currentColor"/></svg>
          {{ total }} Premium
        </div>
      </div>

      @if (loading) {
        <div class="cards-skeleton">
          @for (i of [1,2,3,4,5,6]; track i) { <div class="skeleton-card"></div> }
        </div>
      } @else {
        <div class="table-card">
          <table class="data-table">
            <thead>
              <tr>
                <th>Kullanıcı</th>
                <th>E-posta</th>
                <th>Plan</th>
                <th>Cinsiyet</th>
                <th>Yaş</th>
                <th>Kayıt Tarihi</th>
              </tr>
            </thead>
            <tbody>
              @for (u of users; track u.id) {
                <tr>
                  <td>
                    <div class="user-cell">
                      <div class="avatar premium" [style.background]="getColor(u)">
                        {{ (u.firstName || '?')[0] }}
                        <span class="crown">👑</span>
                      </div>
                      <span>{{ u.firstName }} {{ u.lastName }}</span>
                    </div>
                  </td>
                  <td class="text-muted">{{ u.email }}</td>
                  <td>
                    <span class="premium-badge">
                      ⭐ {{ u.membership }}
                    </span>
                  </td>
                  <td class="text-muted">{{ u.gender || '—' }}</td>
                  <td class="text-muted">{{ u.age || '—' }}</td>
                  <td class="text-muted">{{ u.createdDate | date:'dd.MM.yyyy' }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <div class="pagination">
          <button class="page-btn" [disabled]="page === 0" (click)="prev()">← Önceki</button>
          <span class="page-info">Sayfa {{ page + 1 }} · {{ total }} kayıt</span>
          <button class="page-btn" [disabled]="(page + 1) * 20 >= total" (click)="next()">Sonraki →</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .page { padding: 32px; }
    .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
    .page-title { font-size: 26px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
    .page-sub { font-size: 14px; color: var(--text-secondary); }
    .text-muted { color: var(--text-secondary) !important; }
    .total-badge {
      display: flex; align-items: center; gap: 8px;
      background: var(--accent-dim); color: var(--accent);
      border: 1px solid rgba(233,30,140,0.2);
      padding: 8px 16px; border-radius: 20px;
      font-size: 14px; font-weight: 600;
    }

    .table-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th {
      padding: 14px 20px; font-size: 11px; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.08em;
      color: var(--text-muted); border-bottom: 1px solid var(--border);
      background: rgba(255,255,255,0.02); text-align: left;
    }
    .data-table td { padding: 14px 20px; font-size: 14px; color: var(--text-primary); border-bottom: 1px solid var(--border); }
    .data-table tr:last-child td { border-bottom: none; }
    .data-table tr:hover td { background: rgba(255,255,255,0.02); }

    .user-cell { display: flex; align-items: center; gap: 10px; }
    .avatar {
      width: 36px; height: 36px; border-radius: 50%; position: relative;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 700; color: white; flex-shrink: 0;
    }
    .avatar.premium { box-shadow: 0 0 0 2px var(--accent), 0 0 12px var(--accent-glow); }
    .crown { position: absolute; top: -8px; right: -4px; font-size: 12px; }

    .premium-badge {
      display: inline-flex; align-items: center;
      padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;
      background: linear-gradient(135deg, rgba(233,30,140,0.15), rgba(124,58,237,0.15));
      color: var(--accent); border: 1px solid rgba(233,30,140,0.2);
    }

    .pagination { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 20px; }
    .page-btn { background: var(--bg-card); border: 1px solid var(--border); color: var(--text-secondary); padding: 8px 16px; border-radius: var(--radius-sm); font-size: 13px; font-family: inherit; cursor: pointer; transition: var(--transition); }
    .page-btn:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
    .page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
    .page-info { font-size: 13px; color: var(--text-secondary); }

    .cards-skeleton { display: flex; flex-direction: column; gap: 8px; }
    .skeleton-card { height: 60px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); animation: pulse 1.5s ease-in-out infinite; }
    @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }
  `]
})
export class MembershipsComponent implements OnInit {
  users: any[] = [];
  total = 0;
  page = 0;
  loading = true;

  private colors = ['#e91e8c', '#7c3aed', '#3b82f6', '#10b981', '#f59e0b'];

  constructor(private admin: AdminService) { }
  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.admin.getMemberships(this.page).subscribe({
      next: (r) => { this.users = r.users; this.total = r.total; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  getColor(u: any) { return this.colors[(u.firstName || '').charCodeAt(0) % this.colors.length]; }
  prev() { this.page--; this.load(); }
  next() { this.page++; this.load(); }
}
