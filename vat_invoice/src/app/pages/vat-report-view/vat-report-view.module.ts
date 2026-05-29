import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VatReportViewComponent } from './vat-report-view.component';

@NgModule({
  imports: [
    VatReportViewComponent,
    RouterModule.forChild([
      {
        path: '',
        component: VatReportViewComponent
      }
    ])
  ]
})
export class VatReportViewModule {}
