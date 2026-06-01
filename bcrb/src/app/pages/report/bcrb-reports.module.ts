import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BcrbReportsComponent } from './bcrb-reports.component';

@NgModule({
  imports: [
    BcrbReportsComponent,
    RouterModule.forChild([
      { path: '', component: BcrbReportsComponent }
    ])
  ],
})
export class BcrbReportsModule {}
