import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BtaTravelComponent } from './bta-travel.component';

@NgModule({
  declarations: [BtaTravelComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: BtaTravelComponent }]),
  ],
})
export class BtaTravelModule {}
