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
import { AuthService }     from './core/services/auth.service';
import { EventBusService } from './core/services/event-bus.service';
import { AmexTabItem }     from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-root',
  template: `
    <div class="mfe-loading-bar" [class.visible]="mfeLoading"></div>

    @if (isAuthPage) {
      <router-outlet></router-outlet>
    } @else {
      <amex-page-shell
        portalStyle="onls"
        [showCustomHeader]="true"
        [showSidebar]="true"
        footerText="© American Express. All rights reserved."
        >
        <div header>
          <amex-top-nav-bar
            portalStyle="onls"
            portalTitle="ONLS Helper Tool"
            [username]="username"
            (logout)="onLogoutRequest()"
            (menuToggle)="onMenuToggle()">
          </amex-top-nav-bar>
          <amex-tab-bar
            portalStyle="onls"
            [tabs]="tabs"
            [activeTabId]="activeTabId"
            [activeSubId]="activeSubId"
            (tabClick)="onTabClick($event)"
            (subClick)="onSubClick($event)">
          </amex-tab-bar>

          <!-- Misc dropdown -->
          @if (activeTabId === 'misc' && showSubMenu) {
            <div class="misc-submenu">
              <div class="misc-submenu__inner">
                @for (sub of miscSubItems; track sub.id) {
                  <span
                    class="misc-submenu__item"
                    [class.misc-submenu__item--active]="activeSubId === sub.id"
                    (click)="onSubClick(sub.id)">
                    {{ sub.label }}
                  </span>
                }
              </div>
            </div>
          }
          @if (activeTabId === 'misc' && activeSubId && !showSubMenu) {
            <div class="misc-breadcrumb">
              <span>Misc</span>
              <span class="misc-breadcrumb__sep"> › </span>
              <span class="misc-breadcrumb__current">{{ getActiveSubLabel() }}</span>
              <span class="misc-breadcrumb__change" (click)="showSubMenu = true"> (change)</span>
            </div>
          }

          <!-- Centurion dropdown -->
          @if (activeTabId === 'centurion' && showSubMenu) {
            <div class="misc-submenu">
              <div class="misc-submenu__inner">
                @for (sub of centurionSubItems; track sub.id) {
                  <span
                    class="misc-submenu__item"
                    [class.misc-submenu__item--active]="activeSubId === sub.id"
                    (click)="onCenturionSubClick(sub.id)">
                    {{ sub.label }}
                  </span>
                }
              </div>
            </div>
          }
          @if (activeTabId === 'centurion' && activeSubId && !showSubMenu) {
            <div class="misc-breadcrumb">
              <span>Centurion</span>
              <span class="misc-breadcrumb__sep"> › </span>
              <span class="misc-breadcrumb__current">{{ getActiveCenturionLabel() }}</span>
              <span class="misc-breadcrumb__change" (click)="showSubMenu = true"> (change)</span>
            </div>
          }
        </div>

        <router-outlet></router-outlet>
      </amex-page-shell>
    }

    <amex-logout-confirmation
      [visible]="showLogoutDialog"
      serverLabel="tst-websrv01 says"
      message="Are you sure you want to log out?"
      (confirm)="onLogoutConfirm()"
      (cancel)="showLogoutDialog = false">
    </amex-logout-confirmation>
  `,
  standalone: false
})
export class AppComponent implements OnInit, OnDestroy {

  isAuthPage       = false;
  mfeLoading       = false;
  showLogoutDialog = false;
  showSubMenu      = false;
  activeTabId      = 'bta';
  activeSubId      = '';
  username         = '';

  private subs = new Subscription();

  readonly tabs: AmexTabItem[] = [
    { id: 'bta',             label: 'BTA' },
    { id: 'account',         label: 'Online Account Services' },
    { id: 'supp',            label: 'Supplementary Access Helper' },
    { id: 'offers',          label: 'Offers' },
    { id: 'benefits',        label: 'Benefits' },
    { id: 'misc',            label: 'Misc' },
    { id: 'change-password', label: 'Change Password' },
    { id: 'centurion',       label: 'Centurion' },
  ];

  readonly centurionSubItems: AmexTabItem[] = [
    { id: 'centurion-2.0', label: 'Centurion 2.0' },
    { id: 'Cen-LCY-EXC',   label: 'Cen LCY EXC' },
  ];

  readonly miscSubItems: AmexTabItem[] = [
    { id: 'pay-with-points', label: 'Select & Pay With Points' },
    { id: 'digital-wallet',  label: 'Digital Wallet' },
    { id: 'wearables',       label: 'AMEX Wearables' },
    { id: 'pin-unblock',     label: 'PIN Unblock' },
    { id: 'sms-status',      label: 'SMS Status' },
    { id: 'priority-pass',   label: 'ENROLL FOR PRIORITY PASS™' },
    { id: 'valueback',       label: 'ValueBack' },
    { id: 'pccm-ftp',        label: 'Pccm Ftp Sequence Status' },
  ];

  private readonly subRouteMap: Record<string, string> = {
    'pay-with-points': '/pay-with-points',
    'digital-wallet':  '/misc/digital-wallet',
    'wearables':       '/misc/wearables',
    'pin-unblock':     '/misc/pin-unblock',
    'sms-status':      '/misc/sms-status',
    'priority-pass':   '/misc/priority-pass',
    'valueback':       '/misc/valueback',
    'pccm-ftp':        '/misc/pccm-ftp',
  };

  private readonly centurionRouteMap: Record<string, string> = {
    'centurion-2.0': '/centurion/centurion-2.0',
    'Cen-LCY-EXC':   '/centurion/cen-lcy-exc',
  };

  constructor(
    private router: Router,
    private auth:   AuthService,
    private bus:    EventBusService,
  ) { }

  ngOnInit(): void {
    this.isAuthPage = this.checkIsAuthRoute(this.router.url);
    this.username   = this.auth.getUser()?.username ?? '';
    this.syncFromUrl(this.router.url);

    this.subs.add(
      this.router.events.pipe(
        filter(e =>
          e instanceof NavigationEnd    ||
          e instanceof NavigationStart  ||
          e instanceof NavigationCancel ||
          e instanceof NavigationError
        )
      ).subscribe((e: any) => {
        if (e instanceof NavigationStart) {
          this.mfeLoading = true;
        } else {
          this.mfeLoading = false;
          if (e instanceof NavigationEnd) {
            const url = e.urlAfterRedirects as string;
            this.isAuthPage = this.checkIsAuthRoute(url);
            if (!this.isAuthPage) {
              this.syncFromUrl(url);
            }
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private checkIsAuthRoute(url: string): boolean {
    return (
      url.startsWith('/login') ||
      url.startsWith('/forgot-password') ||
      url === '/' ||
      url === ''
    );
  }

  // ── NEVER call router.navigate() inside this method ──
  // It runs inside a NavigationEnd subscriber — calling navigate
  // here creates an infinite loop: NavigationEnd → navigate → NavigationEnd
  private syncFromUrl(url: string): void {
    if (url.startsWith('/offers/benefits'))  { this.activeTabId = 'benefits';        this.activeSubId = ''; return; }
    if (url.startsWith('/offers'))           { this.activeTabId = 'offers';          this.activeSubId = ''; return; }
    if (url.startsWith('/supp'))             { this.activeTabId = 'supp';            this.activeSubId = ''; return; }
    if (url.startsWith('/account'))          { this.activeTabId = 'account';         this.activeSubId = ''; return; }
    if (url.startsWith('/bta'))              { this.activeTabId = 'bta';             this.activeSubId = ''; return; }
    if (url.startsWith('/change-password'))  { this.activeTabId = 'change-password'; this.activeSubId = ''; return; }

    for (const [subId, route] of Object.entries(this.subRouteMap)) {
      if (url.startsWith(route)) {
        this.activeTabId = 'misc';
        this.activeSubId = subId;
        this.showSubMenu = false;
        return;
      }
    }

    if (url.startsWith('/pay-with-points')) {
      this.activeTabId = 'misc';
      this.activeSubId = 'pay-with-points';
      this.showSubMenu = false;
      return;
    }

    for (const [subId, route] of Object.entries(this.centurionRouteMap)) {
      if (url.startsWith(route)) {
        this.activeTabId = 'centurion';
        this.activeSubId = subId;
        this.showSubMenu = false;
        return;
      }
    }
  }

  onTabClick(tabId: string): void {
    if (tabId === 'misc' || tabId === 'centurion') {
      if (this.activeTabId === tabId) {
        this.showSubMenu = !this.showSubMenu;
      } else {
        this.activeTabId = tabId;
        this.activeSubId = '';
        this.showSubMenu = true;
      }
      return;
    }

    this.showSubMenu = false;
    this.activeTabId = tabId;
    this.activeSubId = '';

    const routeMap: Record<string, string> = {
      account:           '/account',
      supp:              '/supp',
      bta:               '/bta',
      offers:            '/offers',
      benefits:          '/offers/benefits',
      'change-password': '/change-password',
    };
    if (routeMap[tabId]) {
      this.router.navigate([routeMap[tabId]]);
    }
  }

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

  getActiveSubLabel(): string {
    return this.miscSubItems.find(s => s.id === this.activeSubId)?.label ?? '';
  }

  getActiveCenturionLabel(): string {
    return this.centurionSubItems.find(s => s.id === this.activeSubId)?.label ?? '';
  }

  onMenuToggle(): void {}

  onLogoutRequest(): void { this.showLogoutDialog = true; }

  onLogoutConfirm(): void {
    this.showLogoutDialog = false;
    this.bus.emit({ type: 'USER_LOGGED_OUT' });
    this.auth.logout();
  }
}