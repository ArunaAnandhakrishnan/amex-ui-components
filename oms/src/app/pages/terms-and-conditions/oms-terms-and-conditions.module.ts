import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import {
  OmsTermsAndConditionsComponent
} from './oms-terms-and-conditions.component';

@NgModule({
  imports: [

    OmsTermsAndConditionsComponent,

    RouterModule.forChild([
      {
        path: '',
        component:
          OmsTermsAndConditionsComponent
      }
    ])
  ]
})
export class OmsTermsAndConditionsModule {}