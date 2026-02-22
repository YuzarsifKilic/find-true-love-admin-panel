import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
    private readonly API = environment.apiUrl;

    constructor(private http: HttpClient, private auth: AuthService) { }

    private headers(): HttpHeaders {
        return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
    }

    getStats(): Observable<any> {
        return this.http.get(`${this.API}/admin/stats`, { headers: this.headers() });
    }

    getUsers(page = 0, size = 20): Observable<any> {
        return this.http.get(`${this.API}/admin/users?page=${page}&size=${size}`, { headers: this.headers() });
    }

    banUser(userId: string): Observable<any> {
        return this.http.put(`${this.API}/admin/users/${userId}/ban`, {}, { headers: this.headers(), responseType: 'text' });
    }

    unbanUser(userId: string): Observable<any> {
        return this.http.put(`${this.API}/admin/users/${userId}/unban`, {}, { headers: this.headers(), responseType: 'text' });
    }

    getReports(page = 0, size = 20): Observable<any> {
        return this.http.get(`${this.API}/admin/reports?page=${page}&size=${size}`, { headers: this.headers() });
    }

    solveReport(reportId: string): Observable<any> {
        return this.http.put(`${this.API}/admin/reports/${reportId}/solve`, {}, { headers: this.headers(), responseType: 'text' });
    }

    getMemberships(page = 0, size = 20): Observable<any> {
        return this.http.get(`${this.API}/admin/memberships?page=${page}&size=${size}`, { headers: this.headers() });
    }
}
