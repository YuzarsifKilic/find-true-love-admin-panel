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
    selector: 'app-reports',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule,
        MatProgressSpinnerModule, MatChipsModule, MatPaginatorModule, MatSnackBarModule, MatCardModule],
    template: `
    <div class="page">
      <h2 class="page-title">Raporlar</h2>
      @if (loading) {
        <div class="center"><mat-spinner></mat-spinner></div>
      } @else {
        <mat-card>
          <table mat-table [dataSource]="reports" class="full-table">
            <ng-container matColumnDef="reportedBy">
              <th mat-header-cell *matHeaderCellDef>Raporlayan</th>
              <td mat-cell *matCellDef="let r">{{ r.reportedByUserName }}</td>
            </ng-container>
            <ng-container matColumnDef="reported">
              <th mat-header-cell *matHeaderCellDef>Raporlanan</th>
              <td mat-cell *matCellDef="let r">{{ r.reportedUserName }}</td>
            </ng-container>
            <ng-container matColumnDef="type">
              <th mat-header-cell *matHeaderCellDef>Tür</th>
              <td mat-cell *matCellDef="let r">
                <mat-chip color="warn" highlighted>{{ r.reportType }}</mat-chip>
              </td>
            </ng-container>
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Tarih</th>
              <td mat-cell *matCellDef="let r">{{ r.createdDate | date:'dd.MM.yyyy HH:mm' }}</td>
            </ng-container>
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Durum</th>
              <td mat-cell *matCellDef="let r">
                <mat-chip [color]="r.isSolved ? 'primary' : 'warn'" highlighted>
                  {{ r.isSolved ? 'Çözüldü' : 'Açık' }}
                </mat-chip>
              </td>
            </ng-container>
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>İşlem</th>
              <td mat-cell *matCellDef="let r">
                @if (!r.isSolved) {
                  <button mat-stroked-button color="primary" (click)="solve(r)">
                    <mat-icon>check</mat-icon> Çözüldü
                  </button>
                } @else {
                  <span class="solved-text">✓ Tamamlandı</span>
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
    .center { display: flex; justify-content: center; margin-top: 80px; }
    td, th { padding: 12px 16px !important; }
    .solved-text { color: #4caf50; font-size: 13px; }
  `]
})
export class ReportsComponent implements OnInit {
    reports: any[] = [];
    total = 0;
    loading = true;
    columns = ['reportedBy', 'reported', 'type', 'date', 'status', 'actions'];

    constructor(private admin: AdminService, private snack: MatSnackBar) { }

    ngOnInit() { this.load(0); }

    load(page: number) {
        this.loading = true;
        this.admin.getReports(page).subscribe({
            next: (res) => { this.reports = res.reports; this.total = res.total; this.loading = false; },
            error: () => { this.loading = false; }
        });
    }

    onPage(e: PageEvent) { this.load(e.pageIndex); }

    solve(r: any) {
        this.admin.solveReport(r.id).subscribe(() => {
            r.isSolved = true;
            this.snack.open('Rapor çözüldü olarak işaretlendi', 'Kapat', { duration: 3000 });
        });
    }
}
