import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  OmsReportFormatComponent
} from './oms-report-format.component';

@NgModule({
  imports: [
    OmsReportFormatComponent,
    RouterModule.forChild([
      {
        path: '',
        component:
          OmsReportFormatComponent
      }
    ])
  ]
})
export class OmsReportFormatModule {}