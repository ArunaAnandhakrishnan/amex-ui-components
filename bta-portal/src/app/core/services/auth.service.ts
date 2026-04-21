import { Injectable } from '@angular/core';

/**
 * BTA Auth Service
 * Reads JWT token from localStorage — token is written by the Shell's AuthService.
 * Keys are identical to shell/src/app/core/services/auth.service.ts
 */
@Injectable({ providedIn: 'root' })
export class BtaAuthService {
  static readonly TOKEN_KEY = 'mfe_token';
  static readonly USER_KEY  = 'mfe_user';

  getToken(): string | null {
    return localStorage.getItem(BtaAuthService.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUser(): { username: string; role: string } | null {
    const raw = localStorage.getItem(BtaAuthService.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}
