import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';
import { LoginComponent }       from './pages/login/login.component';
import { HeaderComponent }      from './layout/header/header.component';
import { SidebarComponent }     from './layout/sidebar/sidebar.component';

import { AuthInterceptor }  from './core/interceptors/auth.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

// ✅ Amex UI components from @vn-core-ui-components/ui
import { AmexTopNavBarComponent }          from '@vn-core-ui-components/ui';
import { AmexTabBarComponent }             from '@vn-core-ui-components/ui';
import { AmexSidebarMenuComponent }        from '@vn-core-ui-components/ui';
import { AmexLogoutConfirmationComponent } from '@vn-core-ui-components/ui';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    // ✅ Standalone Amex components imported into NgModule
    AmexTopNavBarComponent,
    AmexTabBarComponent,
    AmexSidebarMenuComponent,
    AmexLogoutConfirmationComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,  multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
