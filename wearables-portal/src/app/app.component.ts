import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

import {
  AmexTopNavBarComponent,
  AmexTabBarComponent, AmexTabItem,
  AmexSidebarMenuComponent,
  AmexLogoutConfirmationComponent,
} from '@vn-core-ui-components/ui';

/**
 * AppComponent — used only when running wearables-portal standalone (:4206 direct).
 * When loaded inside the Shell, the shell provides its own chrome and this
 * component is bypassed — only the router-outlet content renders.
 */
@Component({
  selector: 'app-root',
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
      <amex-top-nav-bar
        portalStyle="onls"
        portalTitle="ONLS Helper Tool"
        (logout)="showLogout = true">
      </amex-top-nav-bar>

      <amex-tab-bar
        portalStyle="onls"
        [tabs]="tabs"
        [activeTabId]="activeTab"
        (tabClick)="onTabClick($event)">
      </amex-tab-bar>

      <div class="onls-body">
        <amex-sidebar-menu portalStyle="onls"></amex-sidebar-menu>
        <div class="onls-content">
          <router-outlet></router-outlet>
        </div>
      </div>

      <amex-logout-confirmation
        [visible]="showLogout"
        serverLabel="tst-websrv01 says"
        message="Are you sure you want to log out?"
        (confirm)="onLogout()"
        (cancel)="showLogout = false">
      </amex-logout-confirmation>
    </div>
  `,
})
export class AppComponent implements OnInit {
  showLogout = false;
  activeTab  = 'misc';

  tabs: AmexTabItem[] = [
    { id: 'account',  label: 'Online Account Services'    },
    { id: 'supp',     label: 'Supplementary Access Helper' },
    { id: 'offers',   label: 'Offers'                     },
    { id: 'benefits', label: 'Benefits'                   },
    { id: 'misc',     label: 'Misc'                       },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => { this.activeTab = 'misc'; });
  }

  onTabClick(id: string) { this.activeTab = id; }

  onLogout() {
    this.showLogout = false;
    localStorage.clear();
    window.location.reload();
  }
}