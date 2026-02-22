import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminService } from '../../services/admin.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule],
    template: `
    <div class="page">
      <h2 class="page-title">Dashboard</h2>
      @if (loading) {
        <div class="center"><mat-spinner></mat-spinner></div>
      } @else {
        <div class="stats-grid">
          <mat-card class="stat-card">
            <mat-icon class="stat-icon blue">people</mat-icon>
            <div class="stat-info">
              <span class="stat-value">{{ stats?.totalUsers ?? 0 }}</span>
              <span class="stat-label">Toplam Kullanıcı</span>
            </div>
          </mat-card>
          <mat-card class="stat-card">
            <mat-icon class="stat-icon gold">workspace_premium</mat-icon>
            <div class="stat-info">
              <span class="stat-value">{{ stats?.premiumUsers ?? 0 }}</span>
              <span class="stat-label">Premium Üye</span>
            </div>
          </mat-card>
          <mat-card class="stat-card">
            <mat-icon class="stat-icon red">block</mat-icon>
            <div class="stat-info">
              <span class="stat-value">{{ stats?.bannedUsers ?? 0 }}</span>
              <span class="stat-label">Banlı Kullanıcı</span>
            </div>
          </mat-card>
          <mat-card class="stat-card">
            <mat-icon class="stat-icon orange">report</mat-icon>
            <div class="stat-info">
              <span class="stat-value">{{ stats?.openReports ?? 0 }}</span>
              <span class="stat-label">Açık Rapor</span>
            </div>
          </mat-card>
        </div>
      }
    </div>
  `,
    styles: [`
    .page { padding: 32px; }
    .page-title { font-size: 24px; font-weight: 700; margin: 0 0 24px; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
    .stat-card { display: flex; align-items: center; gap: 20px; padding: 24px; border-radius: 12px; }
    .stat-icon { font-size: 48px; height: 48px; width: 48px; }
    .blue { color: #2196f3; }
    .gold { color: #ff9800; }
    .red { color: #f44336; }
    .orange { color: #ff5722; }
    .stat-value { font-size: 32px; font-weight: 700; display: block; }
    .stat-label { color: #666; font-size: 14px; }
    .center { display: flex; justify-content: center; margin-top: 80px; }
  `]
})
export class DashboardComponent implements OnInit {
    stats: any;
    loading = true;

    constructor(private admin: AdminService) { }

    ngOnInit() {
        this.admin.getStats().subscribe({
            next: (data) => { this.stats = data; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }
}
