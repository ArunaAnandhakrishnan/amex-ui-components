import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import {
  OmsChangePasswordComponent
} from './oms-change-password.component';

@NgModule({
  imports: [

    OmsChangePasswordComponent,

    RouterModule.forChild([
      {
        path: '',
        component:
          OmsChangePasswordComponent
      }
    ])
  ]
})
export class OmsChangePasswordModule {}