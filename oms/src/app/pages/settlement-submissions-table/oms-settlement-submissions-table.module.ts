import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import {
  OmsSettlementSubmissionsTableComponent
} from './oms-settlement-submissions-table.component';

@NgModule({
  imports: [

    OmsSettlementSubmissionsTableComponent,

    RouterModule.forChild([
      {
        path: '',
        component:
          OmsSettlementSubmissionsTableComponent
      }
    ])
  ]
})
export class OmsSettlementSubmissionsTableModule {}