import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { AdminService } from '../../services/admin.service';

@Component({
    selector: 'app-memberships',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatIconModule,
        MatProgressSpinnerModule, MatChipsModule, MatPaginatorModule, MatCardModule],
    template: `
    <div class="page">
      <h2 class="page-title">Premium Üyelikler</h2>
      @if (loading) {
        <div class="center"><mat-spinner></mat-spinner></div>
      } @else {
        <mat-card>
          <table mat-table [dataSource]="users" class="full-table">
            <ng-container matColumnDef="photo">
              <th mat-header-cell *matHeaderCellDef>Fotoğraf</th>
              <td mat-cell *matCellDef="let u">
                <img [src]="u.mainPhoto || 'https://ui-avatars.com/api/?name=User'" class="avatar" alt="photo"
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
              <th mat-header-cell *matHeaderCellDef>Plan</th>
              <td mat-cell *matCellDef="let u">
                <mat-chip color="accent" highlighted>
                  <mat-icon matChipAvatar>workspace_premium</mat-icon>
                  {{ u.membership }}
                </mat-chip>
              </td>
            </ng-container>
            <ng-container matColumnDef="joined">
              <th mat-header-cell *matHeaderCellDef>Kayıt Tarihi</th>
              <td mat-cell *matCellDef="let u">{{ u.createdDate | date:'dd.MM.yyyy' }}</td>
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
export class MembershipsComponent implements OnInit {
    users: any[] = [];
    total = 0;
    loading = true;
    columns = ['photo', 'name', 'email', 'membership', 'joined'];

    constructor(private admin: AdminService) { }

    ngOnInit() { this.load(0); }

    load(page: number) {
        this.loading = true;
        this.admin.getMemberships(page).subscribe({
            next: (res) => { this.users = res.users; this.total = res.total; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    onPage(e: PageEvent) { this.load(e.pageIndex); }
}
