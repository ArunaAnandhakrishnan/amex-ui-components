import { NgModule }      from '@angular/core';
import { RouterModule }  from '@angular/router';

import { PayWithPointsComponent } from './pay-with-points.component';

/**
 * PayWithPointsModule — the Module Federation EXPOSED module.
 *
 * This is what the shell loads via:
 *   loadRemoteModule({ ..., exposedModule: './Module' })
 *   .then(m => m.PayWithPointsRemoteEntryModule)
 *
 * It registers a single child route '' → PayWithPointsComponent.
 * The shell mounts this under /pay-with-points, so the full path is:
 *   http://localhost:4200/pay-with-points
 *
 * IMPORTANT: RouterModule.forChild (NOT forRoot) — using forRoot inside
 * a lazy-loaded remote causes duplicate router instances and re-rendering.
 */
@NgModule({
  imports: [
    PayWithPointsComponent,
    RouterModule.forChild([
      { path: '', component: PayWithPointsComponent },
    ]),
  ],
})
export class PayWithPointsModule {}

// Alias exported so the shell's .then(m => m.PayWithPointsRemoteEntryModule) works
export { PayWithPointsModule as PayWithPointsRemoteEntryModule };
