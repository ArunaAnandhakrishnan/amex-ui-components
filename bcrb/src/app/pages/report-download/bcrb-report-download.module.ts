import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BcrbReportDownloadComponent } from './bcrb-report-download.component';

@NgModule({
  imports: [
    BcrbReportDownloadComponent,
    RouterModule.forChild([
      { path: '', component: BcrbReportDownloadComponent }
    ])
  ],
})
export class BcrbReportDownloadModule {}
