import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import {
  OmsEditUserFormComponent
} from './oms-edit-user-form.component';

@NgModule({
  imports: [

    OmsEditUserFormComponent,

    RouterModule.forChild([
      {
        path: '',
        component:
          OmsEditUserFormComponent
      }
    ])
  ]
})
export class OmsEditUserFormModule {}