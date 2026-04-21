import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BtaPaymentAllocationComponent } from './bta-payment-allocation.component';

@NgModule({
  imports: [
    BtaPaymentAllocationComponent,
    RouterModule.forChild([{ path: '', component: BtaPaymentAllocationComponent }]),
  ],
})
export class BtaPaymentAllocationModule {}
