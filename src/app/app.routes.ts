import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
    {
        path: '',
        loadComponent: () => import('./layout/shell/shell.component').then(m => m.ShellComponent),
        canActivate: [authGuard],
        children: [
            { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
            { path: 'users', loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent) },
            { path: 'reports', loadComponent: () => import('./pages/reports/reports.component').then(m => m.ReportsComponent) },
            { path: 'memberships', loadComponent: () => import('./pages/memberships/memberships.component').then(m => m.MembershipsComponent) },
        ]
    },
    { path: '**', redirectTo: '/dashboard' }
];
