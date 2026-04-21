import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BtaLargeReportsComponent } from './bta-large-reports.component';

@NgModule({
  imports: [
    BtaLargeReportsComponent,
    RouterModule.forChild([{ path: '', component: BtaLargeReportsComponent }]),
  ],
})
export class BtaLargeReportsModule {}
