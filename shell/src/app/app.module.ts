import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule }  from './app-routing.module';
import { AppComponent }      from './app.component';
import { LoginComponent }    from './pages/login/login.component';

import { AuthInterceptor }   from './core/interceptors/auth.interceptor';
import { ErrorInterceptor }  from './core/interceptors/error.interceptor';

// ── Amex UI components ─────────────────────────────────────────────
// AmexPageShellComponent is the single entry point for shell layout.
// It internally uses AmexTopNavBarComponent, AmexTabBarComponent,
// AmexSidebarMenuComponent, AmexPageHeaderComponent etc.
// We also import AmexTopNavBarComponent + AmexTabBarComponent here
// because AppComponent projects a custom header slot into the shell.
// AmexLogoutConfirmationComponent is used outside the shell for overlay.
import { AmexPageShellComponent }         from '@vn-core-ui-components/ui';
import { AmexTopNavBarComponent }         from '@vn-core-ui-components/ui';
import { AmexTabBarComponent }            from '@vn-core-ui-components/ui';
import { AmexLogoutConfirmationComponent } from '@vn-core-ui-components/ui';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // HeaderComponent  — removed: logic moved into AppComponent
    // SidebarComponent — removed: sidebar handled by amex-page-shell internally
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,

    // Shell entry point — owns the full page chrome
    AmexPageShellComponent,

    // Used directly in AppComponent's custom header projection slot
    AmexTopNavBarComponent,
    AmexTabBarComponent,

    // Logout overlay — rendered outside shell in AppComponent template
    AmexLogoutConfirmationComponent,

    // AmexSidebarMenuComponent — NOT needed here anymore.
    // amex-page-shell imports and renders it internally.
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,  multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}