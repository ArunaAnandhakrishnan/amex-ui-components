import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BcrbDashboardComponent } from './bcrb-dashboard.component';

@NgModule({
  imports: [
    BcrbDashboardComponent,
    RouterModule.forChild([
      { path: '', component: BcrbDashboardComponent }
    ])
  ],
})
export class BcrbDashboardModule {}