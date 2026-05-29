import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  OmsContactInformationComponent
} from './oms-contact-information.component';

@NgModule({
  imports: [
    OmsContactInformationComponent,
    RouterModule.forChild([
      {
        path: '',
        component:
          OmsContactInformationComponent
      }
    ])
  ]
})
export class OmsContactInformationModule {}