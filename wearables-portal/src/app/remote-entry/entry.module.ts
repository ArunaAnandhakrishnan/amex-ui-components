import { NgModule, Component } from '@angular/core';
import { CommonModule }        from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SHELL_HOSTED } from '../core/tokens/shell.token';

@Component({
  selector: 'wearables-entry',
  template: `<router-outlet></router-outlet>`,
})
export class WearablesEntryComponent {}

const routes: Routes = [
  {
    path: '',
    component: WearablesEntryComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../wearables/wearables.module').then(m => m.WearablesModule),
      },
    ],
  },
];

@NgModule({
  declarations: [WearablesEntryComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [
    // ✅ Tells WearablesComponent it's running inside the shell.
    //    The component will skip rendering AmexPageShellComponent
    //    (the shell already provides chrome) to avoid double-layout.
    { provide: SHELL_HOSTED, useValue: true },
  ],
})
export class WearablesRemoteEntryModule {}
