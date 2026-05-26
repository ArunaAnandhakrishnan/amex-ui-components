import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '',          redirectTo: 'centurion', pathMatch: 'full' },
      { path: 'centurion', loadChildren: () => import('./remote-entry/entry.module').then(m => m.CenturionRemoteEntryModule) },
      { path: '**',        redirectTo: 'centurion' },
    ]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}