import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import {
  OmsMonthsDropdownFilterComponent
} from './oms-months-dropdown-filter.component';

@NgModule({
  imports: [

    OmsMonthsDropdownFilterComponent,

    RouterModule.forChild([
      {
        path: '',
        component:
          OmsMonthsDropdownFilterComponent
      }
    ])
  ]
})
export class OmsMonthsDropdownFilterModule {}