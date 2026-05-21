import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SHELL_HOSTED } from '../core/tokens/shell.token';
@Component({
  selector: 'lounge-entry',
  template: `<router-outlet></router-outlet>`,
})
export class LoungeEntryComponent {}
const routes: Routes = [
  {
    path: '',
    component: LoungeEntryComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../pages/priority-pass/lounge-shell-wrapper.component')
            .then(m => m.LoungeShellWrapperComponent),
        providers: [
          { provide: SHELL_HOSTED, useValue: true },
        ],
      },
    ],
  },
];
@NgModule({
  declarations: [LoungeEntryComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class LoungeRemoteEntryModule {}