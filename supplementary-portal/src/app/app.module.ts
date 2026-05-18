import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    AppComponent,
    RouterModule.forRoot([
      { path: '',     redirectTo: 'supp', pathMatch: 'full' },
      { path: 'supp', loadChildren: () => import('./remote-entry/entry.module').then(m => m.SuppRemoteEntryModule) },
      { path: '**',   redirectTo: 'supp' },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}