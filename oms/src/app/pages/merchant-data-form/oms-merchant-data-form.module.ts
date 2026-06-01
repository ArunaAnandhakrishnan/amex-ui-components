import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  OmsMerchantDataFormComponent
} from './oms-merchant-data-form.component';

@NgModule({
  imports: [
    OmsMerchantDataFormComponent,
    RouterModule.forChild([
      {
        path: '',
        component:
          OmsMerchantDataFormComponent
      }
    ])
  ]
})
export class OmsMerchantDataFormModule {}