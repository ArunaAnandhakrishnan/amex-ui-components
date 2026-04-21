import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BtaMonthlyStatementComponent } from './bta-monthly-statement.component';

@NgModule({
  imports: [
    BtaMonthlyStatementComponent,
    RouterModule.forChild([{ path: '', component: BtaMonthlyStatementComponent }]),
  ],
})
export class BtaMonthlyStatementModule {}
