import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import {
  OmsUserManagementTableComponent
} from './oms-user-management-table.component';

@NgModule({
  imports: [

    OmsUserManagementTableComponent,

    RouterModule.forChild([
      {
        path: '',
        component:
          OmsUserManagementTableComponent
      }
    ])
  ]
})
export class OmsUserManagementTableModule {}