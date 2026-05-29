import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  OmsSidebarComponent
} from './oms-sidebar.component';

@NgModule({
  imports: [
    OmsSidebarComponent,
    RouterModule.forChild([
      {
        path: '',
        component:
          OmsSidebarComponent
      }
    ])
  ]
})
export class OmsSidebarModule {}