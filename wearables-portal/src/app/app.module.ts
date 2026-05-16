import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule }     from '@angular/router';
import { AppComponent }     from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppComponent,
    RouterModule.forRoot([
      {
        // Standalone: always load WearablesShellWrapperComponent.
        // SHELL_HOSTED is NOT provided here → @Optional() returns null
        // → wrapper renders full AmexPageShellComponent chrome.
        path: '',
        loadComponent: () =>
          import('./wearables/wearables-shell-wrapper.component')
            .then(m => m.WearablesShellWrapperComponent),
      },
      { path: '**', redirectTo: '' },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}