import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/priority-pass/lounge-priority-pass.component')
        .then(m => m.LoungePriorityPassComponent),
  },
];