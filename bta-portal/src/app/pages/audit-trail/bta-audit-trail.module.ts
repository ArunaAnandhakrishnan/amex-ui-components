import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BtaAuditTrailComponent } from './bta-audit-trail.component';

@NgModule({
  imports: [
    BtaAuditTrailComponent,
    RouterModule.forChild([{ path: '', component: BtaAuditTrailComponent }]),
  ],
})
export class BtaAuditTrailModule {}
