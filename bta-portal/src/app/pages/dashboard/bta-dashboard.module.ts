import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BtaDashboardComponent } from './bta-dashboard.component';

@NgModule({
  declarations: [BtaDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: BtaDashboardComponent }]),
  ],
})
export class BtaDashboardModule {}
