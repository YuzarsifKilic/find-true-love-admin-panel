import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-shell',
    standalone: true,
    imports: [CommonModule, RouterModule, MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule, MatButtonModule],
    template: `
    <mat-sidenav-container class="shell">
      <mat-sidenav mode="side" opened class="sidenav">
        <div class="brand">
          <mat-icon class="brand-icon">favorite</mat-icon>
          <span>Admin Panel</span>
        </div>
        <mat-nav-list>
          <a mat-list-item routerLink="/dashboard" routerLinkActive="active">
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>
          <a mat-list-item routerLink="/users" routerLinkActive="active">
            <mat-icon matListItemIcon>people</mat-icon>
            <span matListItemTitle>Kullanıcılar</span>
          </a>
          <a mat-list-item routerLink="/reports" routerLinkActive="active">
            <mat-icon matListItemIcon>report</mat-icon>
            <span matListItemTitle>Raporlar</span>
          </a>
          <a mat-list-item routerLink="/memberships" routerLinkActive="active">
            <mat-icon matListItemIcon>workspace_premium</mat-icon>
            <span matListItemTitle>Üyelikler</span>
          </a>
        </mat-nav-list>
        <div class="logout">
          <button mat-stroked-button (click)="logout()">
            <mat-icon>logout</mat-icon> Çıkış
          </button>
        </div>
      </mat-sidenav>
      <mat-sidenav-content class="content">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
    styles: [`
    .shell { height: 100vh; }
    .sidenav {
      width: 240px;
      background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
      color: white;
      display: flex;
      flex-direction: column;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 24px 16px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      font-size: 18px;
      font-weight: 700;
    }
    .brand-icon { color: #e91e63; font-size: 28px; height: 28px; width: 28px; }
    mat-nav-list { flex: 1; padding-top: 16px; }
    a.active { background: rgba(233,30,99,0.2); border-left: 3px solid #e91e63; }
    a mat-icon { color: rgba(255,255,255,0.7); }
    a.active mat-icon { color: #e91e63; }
    a span { color: rgba(255,255,255,0.9); }
    .logout { padding: 16px; }
    .logout button { width: 100%; color: rgba(255,255,255,0.7); border-color: rgba(255,255,255,0.2); }
    .content { background: #f5f5f5; overflow-y: auto; }
  `]
})
export class ShellComponent {
    constructor(private auth: AuthService) { }
    logout() { this.auth.logout(); }
}
