import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BtaUserManagementComponent } from './bta-user-management.component';

@NgModule({
  imports: [
    BtaUserManagementComponent,
    RouterModule.forChild([{ path: '', component: BtaUserManagementComponent }]),
  ],
})
export class BtaUserManagementModule {}
