import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'lounge-entry',
  template: `
    <div class="lounge-shell">
      <div class="lounge-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .lounge-shell {
      display: flex; min-height: 100%;
      font-family: Arial, sans-serif;
    }
    .lounge-content {
      flex: 1; overflow: auto; min-width: 0;
      display: flex; flex-direction: column;
      align-items: flex-start; justify-content: flex-start;
      width: 100%; padding-left: 6%;
    }
  `],
})
export class LoungeEntryComponent {
  constructor(private router: Router) {}
}

const routes: Routes = [
  {
    path: '',
    component: LoungeEntryComponent,
    children: [
      {
        path: '',
        redirectTo: 'priority-pass',
        pathMatch: 'full',
      },
      {
        path: 'priority-pass',
        loadChildren: () =>
          import('../pages/priority-pass/lounge-priority-pass.module')
            .then(m => m.LoungePriorityPassModule),
      },
    ],
  },
];

@NgModule({
  declarations: [LoungeEntryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class LoungeRemoteEntryModule {}