import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd }        from '@angular/router';
import { Subscription }                 from 'rxjs';
import { filter }                       from 'rxjs/operators';
import { AuthService }                  from '../../core/services/auth.service';
import { EventBusService }              from '../../core/services/event-bus.service';
import { AmexTabItem }                  from '@vn-core-ui-components/ui';

/**
 * HeaderComponent — Shell navigation tabs + Misc sub-items.
 *
 * KEY FIXES:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. Re-render fix:
 *    ❌ OLD: onTabClick('misc') immediately navigated to /pay-with-points,
 *            but so did onSubClick('pay-with-points'). Two navigations in one
 *            click cycle caused a NavigationEnd → tab sync → navigate loop.
 *    ✅ FIX: onTabClick for 'misc' does NOT navigate — it only shows the sub-menu.
 *            Navigation only happens in onSubClick, when the user picks a sub-item.
 *
 * 2. Menu-based routing:
 *    Each miscSubItem.id maps to a specific shell route via subRouteMap.
 *    Clicking any sub-item navigates to its own route.
 *
 * 3. Active state sync:
 *    NavigationEnd listener reads the URL and sets both activeTabId and activeSubId
 *    so the correct tab and sub-item are highlighted even on page refresh.
 * ─────────────────────────────────────────────────────────────────────────────
 */
@Component({
  selector:      'app-header',
  templateUrl:   './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  showLogoutDialog = false;
  activeTabId      = 'bta';   // default tab on shell load
  activeSubId      = '';
  showSubMenu      = false;

  private subs = new Subscription();

  /** Main navigation tabs */
  tabs: AmexTabItem[] = [    
    { id: 'bta',      label: 'BTA'                  },
    { id: 'account',  label: 'Online Account Services'     },
    { id: 'supp',     label: 'Supplementary Access Helper'  },
    { id: 'offers',   label: 'Offers'                      },
    { id: 'benefits', label: 'Benefits'                    },
    { id: 'misc',     label: 'Misc'                        },
  ];

  /** Misc dropdown items — id must match a key in subRouteMap */
  miscSubItems: AmexTabItem[] = [
    { id: 'pay-with-points', label: 'Select & Pay With Points'  },
    { id: 'digital-wallet',  label: 'Digital Wallet'            },
    { id: 'wearables',       label: 'AMEX Wearables'            },
    { id: 'pin-unblock',     label: 'PIN Unblock'               },
    { id: 'sms-status',      label: 'SMS Status'                },
    { id: 'priority-pass',   label: 'ENROLL FOR PRIORITY PASS™' },
    { id: 'valueback',       label: 'ValueBack'                 },
    { id: 'pccm-ftp',        label: 'Pccm Ftp Sequence Status'  },
  ];

  /**
   * Maps each miscSubItem id to its shell route.
   * When a new sub-page remote is built, add its route here.
   */
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

  constructor(
    private auth:   AuthService,
    private bus:    EventBusService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Sync active tab / sub from URL on every navigation
    this.subs.add(
      this.router.events
        .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe((e: any) => {
          this.syncFromUrl(e.urlAfterRedirects as string);
        })
    );
    // Sync on init from current URL (handles page refresh)
    this.syncFromUrl(this.router.url);
  }

  /** Determine which tab + sub-item is active based on the current URL */
  private syncFromUrl(url: string): void {
    if (url.startsWith('/offers/benefits')) { this.activeTabId = 'benefits'; this.activeSubId = ''; return; }
    if (url.startsWith('/offers'))          { this.activeTabId = 'offers';   this.activeSubId = ''; return; }
    if (url.startsWith('/supp'))             { this.activeTabId = 'supp';     this.activeSubId = ''; return; }
    if (url.startsWith('/account'))         { this.activeTabId = 'account';  this.activeSubId = ''; return; }
    if (url.startsWith('/bta'))             { this.activeTabId = 'bta';     this.activeSubId = ''; return; }

    // Check all misc sub-routes
    for (const [subId, route] of Object.entries(this.subRouteMap)) {
      if (url.startsWith(route)) {
        this.activeTabId = 'misc';
        this.activeSubId = subId;
        return;
      }
    }
  }

  /**
   * ✅ FIX: Clicking the 'Misc' tab ONLY toggles the sub-menu.
   * It does NOT navigate — navigation happens only in onSubClick.
   * Other tabs navigate directly.
   */
  onTabClick(tabId: string): void {
    if (tabId === 'misc') {
      // Toggle sub-menu visibility; keep current sub-item selected
      this.showSubMenu = !this.showSubMenu;
      this.activeTabId = 'misc';
      return;
    }

    // Close sub-menu when switching away from Misc
    this.showSubMenu = false;
    this.activeTabId = tabId;
    this.activeSubId = '';

    const routeMap: Record<string, string> = {
      account:  '/account',
      supp:     '/supp',
      bta:      '/bta',
      offers:   '/offers',
      benefits: '/offers/benefits',
    };

    if (routeMap[tabId]) {
      this.router.navigate([routeMap[tabId]]);
    }
  }

  /**
   * ✅ Sub-menu item click → navigate based on menu item id.
   * This is the ONLY place that navigates for misc items.
   */
  onSubClick(subId: string): void {
    this.activeSubId = subId;
    this.showSubMenu = false;   // close dropdown after selection

    const route = this.subRouteMap[subId];
    if (route) {
      this.router.navigate([route]);
    }
  }

  /** Returns the label for the currently active sub-item (for breadcrumb) */
  getActiveSubLabel(): string {
    return this.miscSubItems.find(s => s.id === this.activeSubId)?.label ?? '';
  }

  logout(): void {
    this.bus.emit({ type: 'USER_LOGGED_OUT' });
    this.auth.logout();
  }

  ngOnDestroy(): void { this.subs.unsubscribe(); }
}
