import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BtaReportsComponent } from './bta-reports.component';

@NgModule({
  declarations: [BtaReportsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: BtaReportsComponent }]),
  ],
})
export class BtaReportsModule {}
