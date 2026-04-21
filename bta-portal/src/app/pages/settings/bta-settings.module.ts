import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BtaSettingsComponent } from './bta-settings.component';

@NgModule({
  declarations: [BtaSettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: BtaSettingsComponent }]),
  ],
})
export class BtaSettingsModule {}
