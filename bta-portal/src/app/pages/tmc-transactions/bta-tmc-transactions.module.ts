import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BtaTmcTransactionsComponent } from './bta-tmc-transactions.component';

@NgModule({
  imports: [
    BtaTmcTransactionsComponent,
    RouterModule.forChild([{ path: '', component: BtaTmcTransactionsComponent }]),
  ],
})
export class BtaTmcTransactionsModule {}
