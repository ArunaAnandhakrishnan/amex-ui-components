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
      {
        path: '',
        loadComponent: () =>
          import('./pages/priority-pass/lounge-shell-wrapper.component')
            .then(m => m.LoungeShellWrapperComponent),
      },
      { path: '**', redirectTo: '' },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
