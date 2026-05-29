import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VatSidebarComponent } from './vat-sidebar.component';

@NgModule({
  imports: [
    VatSidebarComponent,
    RouterModule.forChild([
      {
        path: '',
        component: VatSidebarComponent
      }
    ])
  ]
})
export class VatSidebarModule {}
