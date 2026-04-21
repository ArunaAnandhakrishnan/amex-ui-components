import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

/**
 * OffersRemoteEntryModule — loaded by Shell at route /offers
 *
 * Document structure:
 *   /offers          → Offers page (Browse by Category + offer cards)
 *   /offers/detail/:id → Offer detail (image, title, enroll, description, T&C)
 *   /offers/benefits → Benefits (card image + Manage My Benefits tiles)
 */
@Component({
  selector: 'offers-entry',
  template: `<router-outlet></router-outlet>`,
})
export class OffersEntryComponent {}

const routes: Routes = [
  {
    path: '',
    component: OffersEntryComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../pages/offers/offers-catalogue.module').then(m => m.OffersCatalogueModule),
      },
      {
        path: 'benefits',
        loadChildren: () =>
          import('../pages/benefits/offers-benefits.module').then(m => m.OffersBenefitsModule),
      },
    ],
  },
];

@NgModule({
  declarations: [OffersEntryComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class OffersRemoteEntryModule {}
