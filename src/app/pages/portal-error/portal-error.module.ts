import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortalErrorComponent } from './portal-error.component';

@NgModule({
  declarations: [PortalErrorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PortalErrorComponent }]),
  ],
})
export class PortalErrorModule {}
