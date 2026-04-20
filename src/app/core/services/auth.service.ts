import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface LoginRequest    { username: string; password: string; }
export interface RegisterRequest { username: string; password: string; email: string; role?: string; }
export interface AuthResponse    { token: string; username: string; role: string; message: string; }
export interface CurrentUser     { username: string; role: string; }

/**
 * Auth Service — Doc Section 4 (Centralized Auth in Shell)
 * ─────────────────────────────────────────────────────────────
 * Flow:
 *   1. User logs in/registers ONCE via Shell (/login)
 *   2. JWT stored in localStorage under TOKEN_KEY
 *   3. All MFEs share the same token (read localStorage directly)
 *   4. AuthInterceptor attaches Bearer token to every HTTP request
 *   5. On 401 → ErrorInterceptor calls logout() automatically
 *
 * Token keys are static so any MFE can import and use them:
 *   import { AuthService } from 'shell/auth'; // or read localStorage
 *   const token = localStorage.getItem('mfe_token');
 * ─────────────────────────────────────────────────────────────
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

  /** Auth service backend — port 8081 */
  private readonly AUTH_API = 'http://localhost:8081/api/auth';

  /** localStorage keys shared across ALL MFEs */
  static readonly TOKEN_KEY = 'mfe_token';
  static readonly USER_KEY  = 'mfe_user';

  private loggedIn$ = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  /** POST /api/auth/login */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.AUTH_API}/login`, credentials)
      .pipe(tap(res => this.storeSession(res)));
  }

  /** POST /api/auth/register — API returns token so user is auto-logged in */
  register(payload: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.AUTH_API}/register`, payload)
      .pipe(tap(res => this.storeSession(res)));
  }

  /** Clear session, redirect to /login */
  logout(): void {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    localStorage.removeItem(AuthService.USER_KEY);
    this.loggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null          { return localStorage.getItem(AuthService.TOKEN_KEY); }
  hasToken(): boolean                { return !!this.getToken(); }
  isLoggedIn(): Observable<boolean>  { return this.loggedIn$.asObservable(); }

  getUser(): CurrentUser | null {
    const raw = localStorage.getItem(AuthService.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  private storeSession(res: AuthResponse): void {
    localStorage.setItem(AuthService.TOKEN_KEY, res.token);
    localStorage.setItem(AuthService.USER_KEY, JSON.stringify({ username: res.username, role: res.role }));
    this.loggedIn$.next(true);
  }
}
