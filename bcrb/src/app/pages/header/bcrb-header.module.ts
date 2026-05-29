import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BcrbHeaderComponent } from './bcrb-header.component';

@NgModule({
  imports: [
    BcrbHeaderComponent,
    RouterModule.forChild([
      { path: '', component: BcrbHeaderComponent }
    ])
  ],
})
export class BcrbHeaderModule {}
