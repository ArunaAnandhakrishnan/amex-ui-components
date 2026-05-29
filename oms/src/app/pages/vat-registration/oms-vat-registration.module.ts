import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  OmsVatRegistrationComponent
} from './oms-vat-registration.component';

@NgModule({
  imports: [
    OmsVatRegistrationComponent,
    RouterModule.forChild([
      {
        path: '',
        component:
          OmsVatRegistrationComponent
      }
    ])
  ]
})
export class OmsVatRegistrationModule {}