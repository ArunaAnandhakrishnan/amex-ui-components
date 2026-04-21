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
  activeTabId = 'offers';
  private subs = new Subscription();

  /**
   * Exact 4 tabs from document image6 / image3 / image10:
   *   Online Account Services | Supplementary Access Helper | Offers | Benefits
   *
   * Routing:
   *   Online Account Services  → /account  (port 4201 MFE)
   *   Supplementary Access Helper → /bta   (port 4203 MFE)
   *   Offers                   → /offers   (port 4204 MFE — Offers Catalogue)
   *   Benefits                 → /offers/benefits (port 4204 MFE — Benefits page)
   */
  tabs: AmexTabItem[] = [
    { id: 'account',  label: 'Online Account Services'    },
    { id: 'supp',     label: 'Supplementary Access Helper' },
    { id: 'offers',   label: 'Offers'                     },
    { id: 'benefits', label: 'Benefits'                   },
  ];

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
          if      (url.startsWith('/offers/benefits')) this.activeTabId = 'benefits';
          else if (url.startsWith('/offers'))           this.activeTabId = 'offers';
          else if (url.startsWith('/bta'))              this.activeTabId = 'supp';
          else if (url.startsWith('/account'))          this.activeTabId = 'account';
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
    };
    if (routes[tabId]) this.router.navigate([routes[tabId]]);
  }

  logout(): void {
    this.bus.emit({ type: 'USER_LOGGED_OUT' });
    this.auth.logout();
  }

  ngOnDestroy(): void { this.subs.unsubscribe(); }
}
