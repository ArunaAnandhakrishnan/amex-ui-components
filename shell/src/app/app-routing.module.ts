import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { LoginComponent }  from './pages/login/login.component';
import { AuthGuard }       from './core/guards/auth.guard';

/**
 * Shell Routing — Module Federation
 *
 * Uses type:'module' which works with webpack's native ModuleFederationPlugin
 * container format. The remotes output scriptType:'text/javascript' (classic script)
 * which is compatible — @angular-architects/module-federation runtime handles loading.
 */

const portalFallback = () =>
  import('./pages/portal-error/portal-error.module').then(m => m.PortalErrorModule);

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'bta', pathMatch: 'full' },

  // ── Online Account Services (port 4201) ───────────────────
  {
    path: 'account',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type:          'module',
        remoteEntry:   'http://localhost:4201/remoteEntry.js',
        exposedModule: './Module',
      })
      .then(m => m.RemoteEntryModule)
      .catch(portalFallback),
  },

  // ── BCRB Report Portal (port 4202) ────────────────────────
  {
    path: 'bcrb',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type:          'module',
        remoteEntry:   'http://localhost:4202/remoteEntry.js',
        exposedModule: './Module',
      })
      .then(m => m.RemoteEntryModule)
      .catch(portalFallback),
  },

  // ── BTA Portal (port 4203) ────────────────────────────────
  {
    path: 'bta',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type:          'module',
        remoteEntry:   'http://localhost:4203/remoteEntry.js',
        exposedModule: './Module',
      })
      .then(m => m.BtaRemoteEntryModule)
      .catch(portalFallback),
  },

  // ── AEME Offers & Benefits (port 4204) ────────────────────
  {
    path: 'offers',
    canActivate: [AuthGuard],
    loadChildren: () =>
      loadRemoteModule({
        type:          'module',
        remoteEntry:   'http://localhost:4204/remoteEntry.js',
        exposedModule: './Module',
      })
      .then(m => m.OffersRemoteEntryModule)
      .catch(portalFallback),
  },

  { path: '**', redirectTo: 'bta' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
