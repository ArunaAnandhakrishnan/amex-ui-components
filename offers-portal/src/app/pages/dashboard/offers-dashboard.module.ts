import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OffersDashboardComponent } from './offers-dashboard.component';

@NgModule({
  imports: [
    OffersDashboardComponent,
    RouterModule.forChild([{ path: '', component: OffersDashboardComponent }]),
  ],
})
export class OffersDashboardModule {}
