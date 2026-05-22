import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

/**
 * AppModule — local dev bootstrap only (port 4210).
 * Shell loads CenLcyExcRemoteEntryModule directly via Module Federation.
 */
@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppComponent,
    RouterModule.forRoot([
      {
        path: '',
        loadComponent: () =>
          import('./pages/currency-exchange/cen-lcy-exc-shell-wrapper.component')
            .then(m => m.CenLcyExcShellWrapperComponent),
      },
      { path: '**', redirectTo: '' },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
