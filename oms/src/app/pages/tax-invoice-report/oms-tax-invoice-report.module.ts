import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';

import {
  OmsTaxInvoiceReportComponent
} from './oms-tax-invoice-report.component';

@NgModule({
  imports: [
    OmsTaxInvoiceReportComponent,

    RouterModule.forChild([
      {
        path: '',
        component:
          OmsTaxInvoiceReportComponent
      }
    ])
  ]
})
export class OmsTaxInvoiceReportModule {}