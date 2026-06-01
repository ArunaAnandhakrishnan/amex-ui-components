import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VatInvoiceDetailsComponent } from './vat-invoice-details.component';

@NgModule({
  imports: [
    VatInvoiceDetailsComponent,
    RouterModule.forChild([
      {
        path: '',
        component: VatInvoiceDetailsComponent
      }
    ])
  ]
})
export class VatInvoiceDetailsModule {}
