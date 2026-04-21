import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OffersCatalogueComponent } from './offers-catalogue.component';

@NgModule({
  imports: [
    OffersCatalogueComponent,
    RouterModule.forChild([{ path: '', component: OffersCatalogueComponent }]),
  ],
})
export class OffersCatalogueModule {}
