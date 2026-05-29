import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import {
  OmsCustomizedReportsFormComponent
} from './oms-customized-reports-form.component';

@NgModule({
  imports: [

    OmsCustomizedReportsFormComponent,

    RouterModule.forChild([
      {
        path: '',
        component:
          OmsCustomizedReportsFormComponent
      }
    ])
  ]
})
export class OmsCustomizedReportsFormModule {}