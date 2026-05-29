import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import {
  OmsSubUserAdminTableComponent
} from './oms-sub-user-admin-table.component';

@NgModule({
  imports: [

    OmsSubUserAdminTableComponent,

    RouterModule.forChild([
      {
        path: '',
        component:
          OmsSubUserAdminTableComponent
      }
    ])
  ]
})
export class OmsSubUserAdminTableModule {}