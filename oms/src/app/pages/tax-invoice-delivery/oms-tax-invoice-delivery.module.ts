import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  OmsTaxInvoiceDeliveryComponent
} from './oms-tax-invoice-delivery.component';

@NgModule({
  imports: [
    OmsTaxInvoiceDeliveryComponent,
    RouterModule.forChild([
      {
        path: '',
        component:
          OmsTaxInvoiceDeliveryComponent
      }
    ])
  ]
})
export class OmsTaxInvoiceDeliveryModule {}