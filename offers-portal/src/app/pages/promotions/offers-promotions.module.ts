import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OffersPromotionsComponent } from './offers-promotions.component';

@NgModule({
  imports: [
    OffersPromotionsComponent,
    RouterModule.forChild([{ path: '', component: OffersPromotionsComponent }]),
  ],
})
export class OffersPromotionsModule {}
