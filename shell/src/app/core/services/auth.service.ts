// src/app/core/services/auth.service.ts
import { Injectable }   from '@angular/core';
import { HttpClient }   from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError }   from 'rxjs/operators';

export interface OnlsUser   { username: string; role: string; }
export interface LoginReq   { username: string; password: string; }
export interface RegisterReq { username: string; email: string; password: string; role: string; }
export interface AuthRes    { username: string; role: string; token: string; message?: string; }

/**
 * AuthService
 *
 * WHAT CHANGED vs OLD:
 * ─────────────────────────────────────────────────────────
 * OLD: login(username, password): boolean
 *      — synchronous, checked mock users, returned true/false
 *      — no HTTP, no Observable
 *
 * NEW: login(data: LoginReq): Observable<AuthRes>
 *      — tries real backend first (POST /api/auth/login)
 *      — falls back to mock in the error handler inside the component
 *      — register() and forgotPassword() added as Observables too
 *
 * WHY Observable:
 *      The real backend is async (HTTP call takes time).
 *      Observable lets the component show a loading spinner,
 *      handle success and error separately, and work without
 *      changing the component code when the backend is ready.
 *
 * TOKEN_KEY and USER_KEY are public static so other classes
 * (LoginComponent's mockLogin) can write to the same keys.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {

  // Public static — used by LoginComponent.mockLogin() to write same keys
  static readonly TOKEN_KEY = 'onls_token';
  static readonly USER_KEY  = 'onls_user';

  private readonly API = 'http://localhost:8080/api/auth'

  // Mock users — used when backend is not available
  private readonly MOCK: Record<string, { password: string; role: string }> = {
    'admin':   { password: 'admin123', role: 'ROLE_ADMIN' },
    'agent01': { password: 'agent123', role: 'ROLE_USER'  },
    'super':   { password: 'super123', role: 'ROLE_ADMIN' },
  };

  constructor(private http: HttpClient) {}

  /**
   * login() — returns Observable<AuthRes>
   *
   * WHY Observable instead of boolean:
   * The component does: this.auth.login(data).subscribe({ next, error })
   * If the real API succeeds → next() runs → token stored → navigate
   * If the API fails (not running) → error() runs → component uses mockLogin()
   */
  login(data: LoginReq): Observable<AuthRes> {
    return this.http.post<AuthRes>(`${this.API}/login`, data);
  }

  /**
   * register() — new method, did not exist in old service
   * Sends username, email, password, role to backend.
   */
  register(data: RegisterReq): Observable<AuthRes> {
    return this.http.post<AuthRes>(`${this.API}/register`, data);
  }

  /**
   * forgotPassword() — new method, did not exist in old service
   * Per document: "Forget Password. Email with temporary password."
   * Sends POST to backend with email → backend emails a temp password.
   */
  forgotPassword(userId: string, email: string): Observable<any> {

  return this.http.post(
    `${this.API}/forgot-password`,
    {
      userId,
      email
    }
  );

}

  /**
   * hasToken() — new method
   * Used in LoginComponent.ngOnInit() to skip login if already logged in.
   * OLD used isLoggedIn() — renamed to hasToken() for clarity.
   */
  hasToken(): boolean {
    return !!localStorage.getItem(AuthService.TOKEN_KEY);
  }

  getToken(): string | null {
  return localStorage.getItem(AuthService.TOKEN_KEY);
}

  /** Kept for backward compatibility — same as hasToken() */
  isLoggedIn(): boolean { return this.hasToken(); }

  logout(): void {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    localStorage.removeItem(AuthService.USER_KEY);
  }

  getUser(): OnlsUser | null {
    const raw = localStorage.getItem(AuthService.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  changePassword(current: string, newPwd: string): boolean {
    const user = this.getUser();
    if (!user) return false;
    const mock = this.MOCK[user.username.toLowerCase()];
    if (mock && mock.password === current) { mock.password = newPwd; return true; }
    return false;
  }
}