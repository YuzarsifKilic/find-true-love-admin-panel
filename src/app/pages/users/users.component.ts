import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { AdminService } from '../../services/admin.service';

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule,
        MatProgressSpinnerModule, MatChipsModule, MatPaginatorModule, MatSnackBarModule, MatCardModule],
    template: `
    <div class="page">
      <h2 class="page-title">Kullanıcılar</h2>
      @if (loading) {
        <div class="center"><mat-spinner></mat-spinner></div>
      } @else {
        <mat-card>
          <table mat-table [dataSource]="users" class="full-table">
            <ng-container matColumnDef="photo">
              <th mat-header-cell *matHeaderCellDef>Fotoğraf</th>
              <td mat-cell *matCellDef="let u">
                <img [src]="u.mainPhoto || 'assets/avatar.png'" class="avatar" alt="photo"
                     onerror="this.src='https://ui-avatars.com/api/?name=User'">
              </td>
            </ng-container>
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Ad Soyad</th>
              <td mat-cell *matCellDef="let u">{{ u.firstName }} {{ u.lastName }}</td>
            </ng-container>
            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>E-posta</th>
              <td mat-cell *matCellDef="let u">{{ u.email }}</td>
            </ng-container>
            <ng-container matColumnDef="membership">
              <th mat-header-cell *matHeaderCellDef>Üyelik</th>
              <td mat-cell *matCellDef="let u">
                <mat-chip [color]="u.membership === 'PREMIUM' ? 'accent' : 'primary'" highlighted>
                  {{ u.membership }}
                </mat-chip>
              </td>
            </ng-container>
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Durum</th>
              <td mat-cell *matCellDef="let u">
                <mat-chip [color]="u.isBanned ? 'warn' : 'primary'" highlighted>
                  {{ u.isBanned ? 'Banlı' : 'Aktif' }}
                </mat-chip>
              </td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>İşlemler</th>
              <td mat-cell *matCellDef="let u">
                @if (!u.isBanned) {
                  <button mat-stroked-button color="warn" (click)="ban(u)">
                    <mat-icon>block</mat-icon> Banla
                  </button>
                } @else {
                  <button mat-stroked-button color="primary" (click)="unban(u)">
                    <mat-icon>check_circle</mat-icon> Banı Kaldır
                  </button>
                }
              </td>
            </ng-container>
            <tr mat-header-row *matHeaderRowDef="columns"></tr>
            <tr mat-row *matRowDef="let row; columns: columns;"></tr>
          </table>
          <mat-paginator [length]="total" [pageSize]="20" (page)="onPage($event)"></mat-paginator>
        </mat-card>
      }
    </div>
  `,
    styles: [`
    .page { padding: 32px; }
    .page-title { font-size: 24px; font-weight: 700; margin: 0 0 24px; }
    .full-table { width: 100%; }
    .avatar { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
    .center { display: flex; justify-content: center; margin-top: 80px; }
    td, th { padding: 12px 16px !important; }
  `]
})
export class UsersComponent implements OnInit {
    users: any[] = [];
    total = 0;
    loading = true;
    columns = ['photo', 'name', 'email', 'membership', 'status', 'actions'];

    constructor(private admin: AdminService, private snack: MatSnackBar) { }

    ngOnInit() { this.load(0); }

    load(page: number) {
        this.loading = true;
        this.admin.getUsers(page).subscribe({
            next: (res) => { this.users = res.users; this.total = res.total; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    onPage(e: PageEvent) { this.load(e.pageIndex); }

    ban(u: any) {
        this.admin.banUser(u.id).subscribe(() => {
            u.isBanned = true;
            this.snack.open(`${u.firstName} banlandı`, 'Kapat', { duration: 3000 });
        });
    }

    unban(u: any) {
        this.admin.unbanUser(u.id).subscribe(() => {
            u.isBanned = false;
            this.snack.open(`${u.firstName} banı kaldırıldı`, 'Kapat', { duration: 3000 });
        });
    }
}
