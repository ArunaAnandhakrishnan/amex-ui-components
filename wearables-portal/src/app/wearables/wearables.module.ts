import { NgModule }      from '@angular/core';
import { RouterModule }  from '@angular/router';
import { WearablesComponent } from './wearables.component';

@NgModule({
  imports: [
    WearablesComponent,
    RouterModule.forChild([{ path: '', component: WearablesComponent }]),
  ],
})
export class WearablesModule {}