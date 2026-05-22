import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/currency-exchange/cen-lcy-exc.component')
        .then(m => m.CenLcyExcComponent),
  },
];
