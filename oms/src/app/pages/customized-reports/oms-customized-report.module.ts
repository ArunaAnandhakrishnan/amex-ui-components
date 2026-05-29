import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import {
  OmsCustomizedReportComponent
} from './oms-customized-report.component';

@NgModule({
  imports: [

    OmsCustomizedReportComponent,

    RouterModule.forChild([
      {
        path: '',
        component:
          OmsCustomizedReportComponent
      }
    ])
  ]
})
export class OmsCustomizedReportModule {}