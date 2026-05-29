import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OmsMerchantPanelComponent } from './oms-merchant-panel.component';

@NgModule({
  imports: [
    OmsMerchantPanelComponent,
    RouterModule.forChild([
      {
        path: '',
        component: OmsMerchantPanelComponent
      }
    ])
  ]
})
export class OmsMerchantPanelModule {}