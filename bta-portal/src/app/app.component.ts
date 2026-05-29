import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexTopNavBarComponent } from '@vn-core-ui-components/ui';
import { AmexTabBarComponent, AmexTabItem } from '@vn-core-ui-components/ui';
import { AmexSidebarMenuComponent } from '@vn-core-ui-components/ui';
import { AmexLogoutConfirmationComponent } from '@vn-core-ui-components/ui';
import { RouterModule } from '@angular/router';

/**
 * BTA standalone shell (port 4203 only).
 * Matches document image3: "MY BTA" header, Login tab, NAVIGATION sidebar.
 * When loaded by shell via MFE, only BtaRemoteEntryModule runs — this is skipped.
 */
@Component({
    selector: 'app-root',
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
      <!-- amex-top-nav-bar: blue strip + AMEX logo + "MY BTA" title -->
      <amex-top-nav-bar
        portalStyle="onls"
        portalTitle="MY BTA"
        (logout)="showLogout = true">
      </amex-top-nav-bar>

      <!-- Tab: Login (matching document image3 "Login" tab under MY BTA) -->
      <amex-tab-bar
        portalStyle="onls"
        [tabs]="tabs"
        [activeTabId]="'bta'"
        (tabClick)="onTabClick($event)">
      </amex-tab-bar>

      <div class="onls-body">
        <!-- ONLS decorative hatched sidebar -->
        <amex-sidebar-menu portalStyle="onls"></amex-sidebar-menu>
        <div class="onls-content">
          <router-outlet></router-outlet>
        </div>
      </div>

      <amex-logout-confirmation
        [visible]="showLogout"
        serverLabel="tst-websrv01 says"
        message="Are you sure you want to log out of MY BTA?"
        (confirm)="onLogout()"
        (cancel)="showLogout = false">
      </amex-logout-confirmation>
    </div>
  `,
    styles: [`
    .onls-shell  { display:flex; flex-direction:column; min-height:100vh; font-family:Arial,sans-serif; background:#fff; }
    .onls-body   { display:flex; flex:1; min-height:0; }
    .onls-content{ flex:1; overflow-y:auto; background:#fff; }
  `]
})
export class AppComponent {
  showLogout = false;

  tabs: AmexTabItem[] = [
    { id: 'bta', label: 'BTA Portal' },
  ];

  onTabClick(_id: string) {}

  onLogout() {
    this.showLogout = false;
    localStorage.clear();
    window.location.reload();
  }
}
