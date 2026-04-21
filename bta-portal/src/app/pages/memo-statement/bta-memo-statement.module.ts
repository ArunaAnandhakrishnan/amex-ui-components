import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BtaMemoStatementComponent } from './bta-memo-statement.component';

@NgModule({
  imports: [
    BtaMemoStatementComponent,
    RouterModule.forChild([{ path: '', component: BtaMemoStatementComponent }]),
  ],
})
export class BtaMemoStatementModule {}
