import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AmexTopNavBarComponent }          from '@vn-core-ui-components/ui';
import { AmexTabBarComponent, AmexTabItem }from '@vn-core-ui-components/ui';
import { AmexSidebarMenuComponent }        from '@vn-core-ui-components/ui';
import { AmexLogoutConfirmationComponent } from '@vn-core-ui-components/ui';

/**
 * Lounge AppComponent — local dev shell (port 4209 only).
 * Matches ONLS Helper portal style from the functional spec.
 * When loaded by shell via MFE, LoungeRemoteEntryModule runs — this is skipped.
 */
@Component({
  selector:   'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AmexTopNavBarComponent,
    AmexTabBarComponent,
    AmexSidebarMenuComponent,
    AmexLogoutConfirmationComponent,
  ],
  template: `
    <div class="onls-shell">
      <!-- Blue top nav bar with AMEX logo and portal title -->
      <amex-top-nav-bar
        portalStyle="onls"
        portalTitle="ONLS Helper Tool"
        (logout)="showLogout = true">
      </amex-top-nav-bar>

      <!-- Tab bar -->
      <amex-tab-bar
        portalStyle="onls"
        [tabs]="tabs"
        [activeTabId]="'lounge'"
        (tabClick)="onTabClick($event)">
      </amex-tab-bar>

      <div class="onls-body">
        <!-- Decorative hatched sidebar (ONLS style) -->
        <amex-sidebar-menu portalStyle="onls"></amex-sidebar-menu>
        <div class="onls-content">
          <router-outlet></router-outlet>
        </div>
      </div>

      <amex-logout-confirmation
        [visible]="showLogout"
        serverLabel="tst-websrv01 says"
        message="Are you sure you want to log out of ONLS Helper?"
        (confirm)="onLogout()"
        (cancel)="showLogout = false">
      </amex-logout-confirmation>
    </div>
  `,
  styles: [`
    .onls-shell  { display:flex; flex-direction:column; min-height:100vh; font-family:Arial,sans-serif; background:#fff; }
    .onls-body   { display:flex; flex:1; min-height:0; }
    .onls-content{ flex:1; overflow-y:auto; background:#fff; }
  `],
})
export class AppComponent {
  showLogout = false;

  tabs: AmexTabItem[] = [
    { id: 'lounge', label: 'Lounge Rationalization' },
  ];

  onTabClick(_id: string) {}

  onLogout() {
    this.showLogout = false;
    localStorage.clear();
    window.location.reload();
  }
}
