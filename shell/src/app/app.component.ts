import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Router,
  NavigationEnd,
  NavigationStart,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { EventBusService } from './core/services/event-bus.service';
import { AmexTabItem } from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-root',
  template: `
    <!-- MFE loading indicator — fixed, above everything -->
    <div class="mfe-loading-bar" [class.visible]="mfeLoading"></div>

    <!-- Login page: no shell chrome -->
    <ng-container *ngIf="isLoginPage; else shellLayout">
      <router-outlet></router-outlet>
    </ng-container>

    <!-- ════════════════════════════════════════════════════════════
         SHELL LAYOUT — amex-page-shell owns header/sidebar/footer.
         We use Approach 3 (showCustomHeader) to project our own
         header slot so the misc sub-menu logic is 100% preserved.
    ════════════════════════════════════════════════════════════ -->
    <ng-template #shellLayout>

      <amex-page-shell
        portalStyle="onls"
        [showCustomHeader]="true"
        [showSidebar]="true"
        footerText="© American Express. All rights reserved."
      >

        <!-- ── Custom header slot ─────────────────────────────── -->
        <!-- attribute selector must be the string "header"       -->
        <div header>

          <!-- Top nav bar: AMEX logo + portal title + logout -->
          <amex-top-nav-bar
            portalStyle="onls"
            portalTitle="ONLS Helper Tool"
            [username]="username"
            (logout)="onLogoutRequest()"
            (menuToggle)="onMenuToggle()">
          </amex-top-nav-bar>

          <!-- Main tab bar -->
          <amex-tab-bar
            portalStyle="onls"
            [tabs]="tabs"
            [activeTabId]="activeTabId"
            [activeSubId]="activeSubId"
            (tabClick)="onTabClick($event)"
            (subClick)="onSubClick($event)">
          </amex-tab-bar>

          <!-- Misc dropdown — shown when Misc tab is active and
               the user hasn't picked a sub-item yet, OR clicked Misc again -->
          <div class="misc-submenu" *ngIf="activeTabId === 'misc' && showSubMenu">
            <div class="misc-submenu__inner">
              <span
                *ngFor="let sub of miscSubItems"
                class="misc-submenu__item"
                [class.misc-submenu__item--active]="activeSubId === sub.id"
                (click)="onSubClick(sub.id)">
                {{ sub.label }}
              </span>
            </div>
          </div>

          <!-- Breadcrumb — shown when a sub-item is selected and the dropdown is closed -->
          <div class="misc-breadcrumb"
               *ngIf="activeTabId === 'misc' && activeSubId && !showSubMenu">
            <span>Misc</span>
            <span class="misc-breadcrumb__sep"> › </span>
            <span class="misc-breadcrumb__current">{{ getActiveSubLabel() }}</span>
            <span class="misc-breadcrumb__change" (click)="showSubMenu = true"> (change)</span>
          </div>

          <!-- Centurion dropdown -->
          <div
            class="misc-submenu"
            *ngIf="activeTabId === 'centurion' && showSubMenu">

            <div class="misc-submenu__inner">

              <span
                *ngFor="let sub of centurionSubItems"
                class="misc-submenu__item"
                [class.misc-submenu__item--active]="activeSubId === sub.id"
                (click)="onCenturionSubClick(sub.id)">

                {{ sub.label }}

              </span>

            </div>
          </div>

          <!-- Centurion breadcrumb -->
          <div
            class="misc-breadcrumb"
            *ngIf="activeTabId === 'centurion' && activeSubId && !showSubMenu">

            <span>Centurion</span>

            <span class="misc-breadcrumb__sep"> › </span>

            <span class="misc-breadcrumb__current">
              {{ getActiveCenturionLabel() }}
            </span>

            <span
              class="misc-breadcrumb__change"
              (click)="showSubMenu = true">

              (change)

            </span>

          </div>

          

        </div>
        <!-- /header slot -->

        <!-- ── Page content (default ng-content slot) ─────────── -->
        <router-outlet></router-outlet>

      </amex-page-shell>

    </ng-template>

    <!-- Logout confirmation dialog — rendered outside the shell so it
         overlays the entire viewport correctly via the component's own
         position:fixed / z-index styling. -->
    <amex-logout-confirmation
      [visible]="showLogoutDialog"
      serverLabel="tst-websrv01 says"
      message="Are you sure you want to log out?"
      (confirm)="onLogoutConfirm()"
      (cancel)="showLogoutDialog = false">
    </amex-logout-confirmation>
  `,
})
export class AppComponent implements OnInit, OnDestroy {

  isLoginPage = false;
  mfeLoading = false;
  showLogoutDialog = false;
  showSubMenu = false;
  activeTabId = 'bta';   // default tab on load
  activeSubId = '';
  username = '';

  private subs = new Subscription();

  // ── Navigation data ───────────────────────────────────────────────

  readonly tabs: AmexTabItem[] = [
    { id: 'bta', label: 'BTA' },
    { id: 'account', label: 'Online Account Services' },
    { id: 'supp', label: 'Supplementary Access Helper' },
    { id: 'offers', label: 'Offers' },
    { id: 'benefits', label: 'Benefits' },
    { id: 'misc', label: 'Misc' },
    { id: 'centurion', label: 'Centurion' },

  ];

  readonly centurionSubItems: AmexTabItem[] = [
    { id: 'centurion-2.0', label: 'Centurion 2.0' },
    { id: 'Cen-LCY-EXC', label: 'Cen LCY EXC' },
  ];

  readonly miscSubItems: AmexTabItem[] = [
    { id: 'pay-with-points', label: 'Select & Pay With Points' },
    { id: 'digital-wallet', label: 'Digital Wallet' },
    { id: 'wearables', label: 'AMEX Wearables' },
    { id: 'pin-unblock', label: 'PIN Unblock' },
    { id: 'sms-status', label: 'SMS Status' },
    { id: 'priority-pass', label: 'ENROLL FOR PRIORITY PASS™' },
    { id: 'valueback', label: 'ValueBack' },
    { id: 'pccm-ftp', label: 'Pccm Ftp Sequence Status' },
  ];

  /** Maps each misc sub-item id → its shell route */
  private readonly subRouteMap: Record<string, string> = {
    'pay-with-points': '/pay-with-points',
    'digital-wallet': '/misc/digital-wallet',
    'wearables': '/misc/wearables',
    'pin-unblock': '/misc/pin-unblock',
    'sms-status': '/misc/sms-status',
    'priority-pass': '/misc/priority-pass',
    'valueback': '/misc/valueback',
    'pccm-ftp': '/misc/pccm-ftp',
  };

  private readonly centurionRouteMap: Record<string, string> = {
    'centurion-2.0': '/centurion/centurion-2.0',
    'Cen-LCY-EXC': '/centurion/cen-lcy-exc',
  };

  constructor(
    private router: Router,
    private auth: AuthService,
    private bus: EventBusService,
  ) { }

  // ── Lifecycle ─────────────────────────────────────────────────────

  ngOnInit(): void {
    // Load stored username into the nav bar
    this.username = this.auth.getUser()?.username ?? '';

    this.subs.add(
      this.router.events.pipe(
        filter(e =>
          e instanceof NavigationEnd ||
          e instanceof NavigationStart ||
          e instanceof NavigationCancel ||
          e instanceof NavigationError
        )
      ).subscribe((e: any) => {
        if (e instanceof NavigationStart) {
          this.mfeLoading = true;
        } else {
          this.mfeLoading = false;
          if (e instanceof NavigationEnd) {
            this.isLoginPage = (e.urlAfterRedirects as string).startsWith('/login');
            this.syncFromUrl(e.urlAfterRedirects as string);
          }
        }
      })
    );

    // Sync active state on initial load / page refresh
    this.syncFromUrl(this.router.url);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // ── URL → active tab/sub sync ─────────────────────────────────────

  private syncFromUrl(url: string): void {
    if (url.startsWith('/offers/benefits')) { this.activeTabId = 'benefits'; this.activeSubId = ''; return; }
    if (url.startsWith('/offers')) { this.activeTabId = 'offers'; this.activeSubId = ''; return; }
    if (url.startsWith('/supp')) { this.activeTabId = 'supp'; this.activeSubId = ''; return; }
    if (url.startsWith('/account')) { this.activeTabId = 'account'; this.activeSubId = ''; return; }
    if (url.startsWith('/bta')) { this.activeTabId = 'bta'; this.activeSubId = ''; return; }

    // MISC
    for (const [subId, route] of Object.entries(this.subRouteMap)) {
      if (url.startsWith(route)) {
        this.activeTabId = 'misc';
        this.activeSubId = subId;
        this.showSubMenu = false;
        return;
      }
    }

    // CENTURION
    for (const [subId, route] of Object.entries(this.centurionRouteMap)) {
      if (url.startsWith(route)) {
        this.activeTabId = 'centurion';
        this.activeSubId = subId;
        this.showSubMenu = false;
        return;
      }
    }
  }

  // ── Tab & sub-menu handlers ───────────────────────────────────────

  /**
   * Clicking Misc tab only toggles the dropdown — it does NOT navigate.
   * All other tabs navigate directly.
   */
  onTabClick(tabId: string): void {
    if (tabId === 'misc' || tabId === 'centurion') {
      this.showSubMenu = !this.showSubMenu;
      this.activeTabId = tabId;
      return;
    }
    this.showSubMenu = false;
    this.activeTabId = tabId;
    this.activeSubId = '';

    const routeMap: Record<string, string> = {
      account: '/account',
      supp: '/supp',
      bta: '/bta',
      offers: '/offers',
      benefits: '/offers/benefits',
    };
    if (routeMap[tabId]) {
      this.router.navigate([routeMap[tabId]]);
    }
  }

  /** Sub-item click → navigate, close dropdown. Only place misc routes are triggered. */
  onSubClick(subId: string): void {
    this.activeSubId = subId;
    this.showSubMenu = false;
    const route = this.subRouteMap[subId];
    if (route) {
      this.router.navigate([route]);
    }
  }

  onCenturionSubClick(subId: string): void {
    this.activeSubId = subId;
    this.showSubMenu = false;

    const route = this.centurionRouteMap[subId];

    if (route) {
      this.router.navigate([route]);
    }
  }

  /** Returns the label for the currently active misc sub-item (for breadcrumb) */
  getActiveSubLabel(): string {
    return this.miscSubItems.find(s => s.id === this.activeSubId)?.label ?? '';
  }

  getActiveCenturionLabel(): string {
    return this.centurionSubItems.find(
      s => s.id === this.activeSubId
    )?.label ?? '';
  }

  onMenuToggle(): void {
    // Reserved for future hamburger / mobile menu handling
  }

  // ── Logout ───────────────────────────────────────────────────────

  /** Called by (logout) output from amex-top-nav-bar — show confirmation first */
  onLogoutRequest(): void {
    this.showLogoutDialog = true;
  }

  /** Called after user confirms logout in the dialog */
  onLogoutConfirm(): void {
    this.showLogoutDialog = false;
    this.bus.emit({ type: 'USER_LOGGED_OUT' });
    this.auth.logout();
  }
}