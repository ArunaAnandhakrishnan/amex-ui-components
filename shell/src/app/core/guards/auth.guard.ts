import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Auth Guard (from doc section 4 + 5)
 * Protects /account and /bcrb routes.
 * Redirects to /login if no valid JWT token found.
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (this.auth.hasToken()) {
      return true;
    }
    // Preserve intended destination so we can redirect after login
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: route.url.join('/') }
    });
    return false;
  }
}
