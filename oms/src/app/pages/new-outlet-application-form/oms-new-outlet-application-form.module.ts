import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import {
  OmsNewOutletApplicationFormComponent
} from './oms-new-outlet-application-form.component';

@NgModule({
  imports: [

    OmsNewOutletApplicationFormComponent,

    RouterModule.forChild([
      {
        path: '',
        component:
          OmsNewOutletApplicationFormComponent
      }
    ])
  ]
})
export class OmsNewOutletApplicationFormModule {}