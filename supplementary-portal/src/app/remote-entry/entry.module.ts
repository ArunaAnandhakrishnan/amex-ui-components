import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AmexPageShellComponent } from '@vn-core-ui-components/ui';

import { SuppSearchComponent } from '../pages/search/supp-search.component';

@Component({
  selector: 'supp-entry',
  standalone: false,
  template: `
    <amex-page-shell
      portalStyle="onls"
      pageTitle="SUPPLEMENTARY ACCESS HELPER"
      [showHeader]="false"
      [showFooter]="false"
      [showSidebar]="false">
      <router-outlet></router-outlet>
    </amex-page-shell>
  `,
})
export class SuppEntryComponent {}

const routes: Routes = [
  {
    path: '',
    component: SuppEntryComponent,
    children: [
      { path: '',       redirectTo: 'search', pathMatch: 'full' },
      { path: 'search', component: SuppSearchComponent },
    ],
  },
];

@NgModule({
  declarations: [SuppEntryComponent],
  imports: [
    CommonModule,
    AmexPageShellComponent,
    RouterModule.forChild(routes),
  ],
})
export class SuppRemoteEntryModule {}