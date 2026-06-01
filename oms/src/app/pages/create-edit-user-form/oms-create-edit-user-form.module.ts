import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import {
  OmsCreateEditUserFormComponent
} from './oms-create-edit-user-form.component';

@NgModule({
  imports: [

    OmsCreateEditUserFormComponent,

    RouterModule.forChild([
      {
        path: '',
        component:
          OmsCreateEditUserFormComponent
      }
    ])
  ]
})
export class OmsCreateEditUserFormModule {}