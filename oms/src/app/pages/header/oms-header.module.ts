import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OmsHeaderComponent } from './oms-header.component';

@NgModule({
  imports: [
    OmsHeaderComponent,
    RouterModule.forChild([
      {
        path: '',
        component: OmsHeaderComponent
      }
    ])
  ]
})
export class OmsHeaderModule {}