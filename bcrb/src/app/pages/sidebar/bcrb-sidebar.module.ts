import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BcrbSidebarComponent } from './bcrb-sidebar.component';

@NgModule({
  imports: [
    BcrbSidebarComponent,
    RouterModule.forChild([
      { path: '', component: BcrbSidebarComponent }
    ])
  ],
})
export class BcrbSidebarModule {}
