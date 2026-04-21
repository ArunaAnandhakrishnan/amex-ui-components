import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

@NgModule({
  // AppComponent is standalone:true — imported not declared
  imports: [
    BrowserModule,
    AppComponent,
    RouterModule.forRoot([
      { path: '',    redirectTo: 'bta', pathMatch: 'full' },
      { path: 'bta', loadChildren: () => import('./remote-entry/entry.module').then(m => m.BtaRemoteEntryModule) },
      { path: '**',  redirectTo: 'bta' },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
