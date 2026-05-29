import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VatHomeComponent } from './vat-home.component';

@NgModule({
  imports: [
    VatHomeComponent,
    RouterModule.forChild([
      {
        path: '',
        component: VatHomeComponent
      }
    ])
  ]
})
export class VatHomeModule {}
