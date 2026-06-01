import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WearablesAuthService {
  static readonly TOKEN_KEY = 'mfe_access_token';
  static readonly USER_KEY  = 'mfe_user';

  getToken(): string | null { return localStorage.getItem(WearablesAuthService.TOKEN_KEY); }
  isLoggedIn(): boolean     { return !!this.getToken(); }
  getUser(): { username: string; role: string } | null {
    const raw = localStorage.getItem(WearablesAuthService.USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }
}