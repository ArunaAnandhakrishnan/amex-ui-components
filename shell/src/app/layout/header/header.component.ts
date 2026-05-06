import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { EventBusService } from '../../core/services/event-bus.service';
import { AmexTabItem } from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  showLogoutDialog = false;
  activeTabId      = 'offers';
  activeSubId      = '';
  private subs     = new Subscription();

  /**
   * Exact 4 tabs from document image6 / image3 / image10:
   *   Online Account Services | Supplementary Access Helper | Offers | Benefits
   *
   * Routing:
   *   Online Account Services  → /account  (port 4201 MFE)
   *   Supplementary Access Helper → /bta   (port 4203 MFE)
   *   Offers                   → /offers   (port 4204 MFE — Offers Catalogue)
   *   Benefits                 → /offers/benefits (port 4204 MFE — Benefits page)
   *   wearables                 → /wearables (port 4205 MFE — Wearables page)
   */
  /** Main tabs — document image */
  tabs: AmexTabItem[] = [
    { id: 'account',  label: 'Online Account Services'    },
    { id: 'supp',     label: 'Supplementary Access Helper' },
    { id: 'offers',   label: 'Offers'                     },
    { id: 'benefits', label: 'Benefits'                   },
    { id: 'misc',     label: 'Misc'                       },
  ];

  /** Sub-items shown under Misc tab */
  miscSubItems: AmexTabItem[] = [
    { id: 'wearables', label: 'AMEX Wearables' },
  ];

  get showSubItems(): boolean {
    return this.activeTabId === 'misc';
  }

  constructor(
    private auth:   AuthService,
    private bus:    EventBusService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.router.events
        .pipe(filter(e => e instanceof NavigationEnd))
        .subscribe((e: any) => {
          const url: string = e.urlAfterRedirects;
          if      (url.startsWith('/wearables'))       { this.activeTabId = 'misc';     this.activeSubId = 'wearables'; }
          else if (url.startsWith('/offers/benefits')) { this.activeTabId = 'benefits'; this.activeSubId = ''; }
          else if (url.startsWith('/offers'))          { this.activeTabId = 'offers';   this.activeSubId = ''; }
          else if (url.startsWith('/bta'))             { this.activeTabId = 'supp';     this.activeSubId = ''; }
          else if (url.startsWith('/account'))         { this.activeTabId = 'account';  this.activeSubId = ''; }
        })
    );
  }

  onTabClick(tabId: string): void {
    this.activeTabId = tabId;
    const routes: Record<string, string> = {
      account:  '/account',
      supp:     '/bta',
      offers:   '/offers',
      benefits: '/offers/benefits',   // Benefits is part of the Offers MFE
      misc:     '/wearables',
    };
    if (routes[tabId]) this.router.navigate([routes[tabId]]);
  }

  onSubClick(subId: string): void {
    this.activeSubId = subId;
    if (subId === 'wearables') this.router.navigate(['/wearables']);
  }

  logout(): void {
    this.bus.emit({ type: 'USER_LOGGED_OUT' });
    this.auth.logout();
  }

  ngOnDestroy(): void { this.subs.unsubscribe(); }
}
