import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BtaCaseManagementComponent } from './bta-case-management.component';

@NgModule({
  imports: [
    BtaCaseManagementComponent,
    RouterModule.forChild([{ path: '', component: BtaCaseManagementComponent }]),
  ],
})
export class BtaCaseManagementModule {}
