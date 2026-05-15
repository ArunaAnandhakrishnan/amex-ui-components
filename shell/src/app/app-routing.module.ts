import { NgModule }        from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule }     from '@angular-architects/module-federation';

import { LoginComponent }  from './pages/login/login.component';
import { AuthGuard }       from './core/guards/auth.guard';

const portalFallback = () =>
  import('./pages/portal-error/portal-error.module').then(m => m.PortalErrorModule);

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '',      redirectTo: 'bta', pathMatch: 'full' },

  // ── Online Account Services (port 4201) ──────────────────────────
  {
    path: 'account',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({ type: 'module', remoteEntry: 'http://localhost:4201/remoteEntry.js', exposedModule: './Module' })
        .then(m => m.RemoteEntryModule).catch(portalFallback),
  },

  // ── BCRB Report Portal (port 4202) ───────────────────────────────
  {
    path: 'bcrb',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({ type: 'module', remoteEntry: 'http://localhost:4202/remoteEntry.js', exposedModule: './Module' })
        .then(m => m.RemoteEntryModule).catch(portalFallback),
  },

  // ── BTA Portal (port 4203) ────────────────────────────────────────
  {
    path: 'bta',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({ type: 'module', remoteEntry: 'http://localhost:4203/remoteEntry.js', exposedModule: './Module' })
        .then(m => m.BtaRemoteEntryModule).catch(portalFallback),
  },

  // ── AEME Offers & Benefits (port 4204) ───────────────────────────
  {
    path: 'offers',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({ type: 'module', remoteEntry: 'http://localhost:4204/remoteEntry.js', exposedModule: './Module' })
        .then(m => m.OffersRemoteEntryModule).catch(portalFallback),
  },

  // ── Pay With Points (port 4207) ───────────────────────────────────
  // Shell mounts the remote at /pay-with-points.
  // The remote's PayWithPointsModule registers child route '' → PayWithPointsComponent.
  // So the full URL is /pay-with-points (no trailing segment needed).
  {
    path: 'pay-with-points',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type:          'module',
        remoteEntry:   'http://localhost:4207/remoteEntry.js',
        exposedModule: './Module',
      })
        .then(m => m.PayWithPointsRemoteEntryModule)
        .catch(portalFallback),
  },

  // ── Misc sub-pages that map to sub-routes INSIDE pay-with-points remote ──
  // When the shell's Misc menu is clicked for sub-items other than pay-with-points,
  // they are routed here as separate paths. The remote stub handles them.
  {
    path: 'misc/digital-wallet',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({ type: 'module', remoteEntry: 'http://localhost:4207/remoteEntry.js', exposedModule: './Module' })
        .then(m => m.PayWithPointsRemoteEntryModule).catch(portalFallback),
  },
  {
    path: 'misc/wearables',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({ type: 'module', remoteEntry: 'http://localhost:4207/remoteEntry.js', exposedModule: './Module' })
        .then(m => m.PayWithPointsRemoteEntryModule).catch(portalFallback),
  },

  
  // ── AMEX Wearables (port 4206) ────────────────────────────
  {
    path: 'wearables',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type:          'module',
        remoteEntry:  'http://localhost:4206/remoteEntry.js',
        exposedModule: './Module',
      })
      .then(m => m.WearablesRemoteEntryModule)
      .catch(portalFallback),
  },

  { path: '**', redirectTo: 'bta' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
