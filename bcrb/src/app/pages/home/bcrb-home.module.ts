import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BcrbHomeComponent } from './bcrb-home.component';

@NgModule({
  imports: [
    BcrbHomeComponent,
    RouterModule.forChild([
      { path: '', component: BcrbHomeComponent }
    ])
  ],
})
export class BcrbHomeModule {}