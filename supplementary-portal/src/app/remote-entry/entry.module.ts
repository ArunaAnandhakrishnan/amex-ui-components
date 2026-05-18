import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';

import { SuppSearchComponent } from '../pages/search/supp-search.component';

@Component({
  selector: 'supp-entry',
  template: `
    <div class="supp-shell">
      <div class="supp-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .supp-shell   { display: block; width: 100%; font-family: Arial, sans-serif; }
    .supp-content { width: 100%; overflow: auto; }
  `],
})
export class SuppEntryComponent {
  constructor(private router: Router) {}
}

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
    RouterModule.forChild(routes),
  ],
})
export class SuppRemoteEntryModule {}