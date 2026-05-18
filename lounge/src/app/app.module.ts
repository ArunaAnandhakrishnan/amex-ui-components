import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

/**
 * AppModule — local dev bootstrap only (port 4209).
 * Shell loads LoungeRemoteEntryModule directly via Module Federation.
 */
@NgModule({
  imports: [
    BrowserModule,
    AppComponent,   // standalone component imported here
    RouterModule.forRoot([
      { path: '',       redirectTo: 'lounge', pathMatch: 'full' },
      { path: 'lounge', loadChildren: () => import('./remote-entry/entry.module').then(m => m.LoungeRemoteEntryModule) },
      { path: '**',     redirectTo: 'lounge' },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
