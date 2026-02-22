import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Raporlar</h1>
          <p class="page-sub">Toplam {{ total }} rapor</p>
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
                <th>Raporlayan</th>
                <th>Raporlanan</th>
                <th>Şikayet Türü</th>
                <th>Tarih</th>
                <th>Durum</th>
                <th>İşlem</th>
              </tr>
            </thead>
            <tbody>
              @for (r of reports; track r.id) {
                <tr>
                  <td>
                    <div class="user-cell">
                      <div class="avatar" [style.background]="getColor(r.reportedByUserName)">
                        {{ (r.reportedByUserName || '?')[0] }}
                      </div>
                      {{ r.reportedByUserName }}
                    </div>
                  </td>
                  <td>
                    <div class="user-cell">
                      <div class="avatar" [style.background]="getColor(r.reportedUserName)">
                        {{ (r.reportedUserName || '?')[0] }}
                      </div>
                      {{ r.reportedUserName }}
                    </div>
                  </td>
                  <td>
                    <span class="report-type">
                      {{ getTypeLabel(r.reportType) }}
                    </span>
                  </td>
                  <td class="text-muted">{{ r.createdDate | date:'dd.MM.yyyy HH:mm' }}</td>
                  <td>
                    @if (r.isSolved) {
                      <span class="badge badge-success">✓ Çözüldü</span>
                    } @else {
                      <span class="badge badge-warning">⚠ Açık</span>
                    }
                  </td>
                  <td>
                    @if (!r.isSolved) {
                      <button class="action-btn primary" (click)="solve(r)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/></svg>
                        Çözüldü
                      </button>
                    } @else {
                      <span class="text-muted" style="font-size:13px">Tamamlandı</span>
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
        <div class="toast success">{{ toast }}</div>
      }
    </div>
  `,
  styles: [`
    .page { padding: 32px; }
    .page-header { margin-bottom: 24px; }
    .page-title { font-size: 26px; font-weight: 800; color: var(--text-primary); margin-bottom: 4px; }
    .page-sub { font-size: 14px; color: var(--text-secondary); }
    .text-muted { color: var(--text-secondary) !important; }

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
    .avatar { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: white; flex-shrink: 0; }

    .report-type { font-size: 12px; color: var(--text-secondary); background: rgba(255,255,255,0.05); padding: 4px 8px; border-radius: 4px; }

    .badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    .badge-success { background: var(--green-dim); color: var(--green); }
    .badge-warning { background: var(--orange-dim); color: var(--orange); }

    .action-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 6px 14px; border-radius: var(--radius-sm);
      font-size: 13px; font-weight: 500; font-family: inherit;
      cursor: pointer; border: 1px solid; transition: var(--transition);
    }
    .action-btn.primary { background: var(--accent-dim); color: var(--accent); border-color: rgba(233,30,140,0.2); }
    .action-btn.primary:hover { background: var(--accent); color: white; }

    .pagination { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 20px; }
    .page-btn { background: var(--bg-card); border: 1px solid var(--border); color: var(--text-secondary); padding: 8px 16px; border-radius: var(--radius-sm); font-size: 13px; font-family: inherit; cursor: pointer; transition: var(--transition); }
    .page-btn:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
    .page-btn:disabled { opacity: 0.3; cursor: not-allowed; }
    .page-info { font-size: 13px; color: var(--text-secondary); }

    .table-skeleton { display: flex; flex-direction: column; gap: 8px; }
    .skeleton-row { height: 60px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius); animation: pulse 1.5s ease-in-out infinite; }
    @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }

    .toast { position: fixed; bottom: 24px; right: 24px; padding: 14px 20px; border-radius: var(--radius-sm); font-size: 14px; font-weight: 500; animation: slideIn 0.3s ease; border: 1px solid; background: var(--green-dim); color: var(--green); border-color: rgba(16,185,129,0.2); }
    @keyframes slideIn { from { transform: translateY(20px); opacity:0 } to { transform: translateY(0); opacity:1 } }
  `]
})
export class ReportsComponent implements OnInit {
  reports: any[] = [];
  total = 0;
  page = 0;
  loading = true;
  toast = '';

  private colors = ['#e91e8c', '#7c3aed', '#3b82f6', '#10b981', '#f59e0b'];
  private typeMap: Record<string, string> = {
    SPAM: '🚫 Spam',
    INAPPROPRIATE_CONTENT: '⚠️ Uygunsuz İçerik',
    FAKE_PROFILE: '🎭 Sahte Profil',
    HARASSMENT: '😡 Taciz',
    OTHER: '📋 Diğer'
  };

  constructor(private admin: AdminService) { }
  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.admin.getReports(this.page).subscribe({
      next: (r) => { this.reports = r.reports; this.total = r.total; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  getColor(name: string) { return this.colors[(name || '').charCodeAt(0) % this.colors.length]; }
  getTypeLabel(type: string) { return this.typeMap[type] || type; }

  solve(r: any) {
    this.admin.solveReport(r.id).subscribe(() => {
      r.isSolved = true;
      this.toast = 'Rapor çözüldü olarak işaretlendi';
      setTimeout(() => this.toast = '', 3000);
    });
  }

  prev() { this.page--; this.load(); }
  next() { this.page++; this.load(); }
}
