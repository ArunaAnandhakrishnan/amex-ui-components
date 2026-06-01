import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BtaAuthService } from '../services/auth.service';

export const btaAuthGuard: CanActivateFn = (route) => {
  const auth   = inject(BtaAuthService);
  const router = inject(Router);

  // Not logged in → go to login
  if (!auth.isLoggedIn()) {
    router.navigate(['/bta/login']);
    return false;
  }

  // Not a BTA user at all → deny
  if (!auth.isBtaUser()) {
    router.navigate(['/bta/login']);
    return false;
  }

  // Per-route role check using route data
  const allowedRoles: string[] = route.data?.['roles'] ?? [];
  if (allowedRoles.length > 0 && !auth.hasRole(...allowedRoles)) {
    // Redirect to their first allowed page instead of a blank screen
    const fallback = getFallback(auth);
    router.navigate([`/bta/${fallback}`]);
    return false;
  }

  return true;
};

function getFallback(auth: BtaAuthService): string {
  if (auth.isCorpAdmin())  return 'user-management';
  if (auth.isCorpUser())   return 'memo-statement';
  if (auth.isTaAdmin())    return 'user-management';
  if (auth.isTaUser())     return 'case-management';
  if (auth.isAemeAdmin())  return 'user-management';
  return 'login';
}