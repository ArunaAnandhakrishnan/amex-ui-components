import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OmsHomeComponent } from './oms-home.component';

@NgModule({
  imports: [
    OmsHomeComponent,
    RouterModule.forChild([
      {
        path: '',
        component: OmsHomeComponent
      }
    ])
  ]
})
export class OmsHomeModule {}