import { NgModule }          from '@angular/core';
import { BrowserModule }     from '@angular/platform-browser';
import { RouterModule }      from '@angular/router';
import { AppComponent }      from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AppComponent,
    RouterModule.forRoot([
      { path: '',           redirectTo: 'wearables', pathMatch: 'full' },
      { path: 'wearables',  loadChildren: () => import('./remote-entry/entry.module').then(m => m.WearablesRemoteEntryModule) },
      { path: '**',         redirectTo: 'wearables' },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}