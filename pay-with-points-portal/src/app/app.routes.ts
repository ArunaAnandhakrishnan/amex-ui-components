import { Routes } from '@angular/router';

// Routes for standalone mode (port 4207).
// Each misc menu item has its own route.
// 'pay-with-points' is fully implemented; others show a Coming Soon stub.
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pay-with-points',
    pathMatch: 'full',
  },
  {
    path: 'pay-with-points',
    loadChildren: () =>
      import('./pages/pay-with-points/pay-with-points.module')
        .then(m => m.PayWithPointsModule),
  },
  // ── Misc sub-pages (stub — replace with real modules as they are built) ──
  {
    path: 'digital-wallet',
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  {
    path: 'wearables',
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  {
    path: 'pin-unblock',
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  {
    path: 'sms-status',
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  {
    path: 'priority-pass',
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  {
    path: 'valueback',
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  {
    path: 'pccm-ftp',
    loadComponent: () =>
      import('./pages/coming-soon/coming-soon.component')
        .then(m => m.ComingSoonComponent),
  },
  { path: '**', redirectTo: 'pay-with-points' },
];
