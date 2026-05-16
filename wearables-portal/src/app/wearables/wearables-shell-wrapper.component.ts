import { Component, Optional, Inject } from '@angular/core';
import { CommonModule }                from '@angular/common';
import { AmexPageShellComponent, AmexTabItem } from '@vn-core-ui-components/ui';
import { WearablesComponent }          from './wearables.component';
import { SHELL_HOSTED }                from '../core/tokens/shell.token';

/**
 * WearablesShellWrapperComponent
 *
 * Single entry point for wearables content in BOTH scenarios:
 *
 * ── Standalone (port 4206 direct) ──────────────────────────────────────────
 *   SHELL_HOSTED token is NOT provided → @Optional() returns null → isShellHosted=false
 *   → renders full <amex-page-shell> chrome wrapping <app-wearables>
 *
 * ── Shell-hosted (MFE via shell router) ────────────────────────────────────
 *   WearablesRemoteEntryModule injects SHELL_HOSTED=true at route level
 *   → isShellHosted=true → renders ONLY <app-wearables> (no double chrome)
 *   Shell owns the outer chrome (AmexTopNavBar + AmexTabBar + AmexSidebar).
 *
 * AmexPageShellComponent is always imported/consumed by this component.
 */
@Component({
  selector: 'app-wearables-shell-wrapper',
  standalone: true,
  imports: [CommonModule, AmexPageShellComponent, WearablesComponent],
  template: `
    <!-- ── Shell-hosted: shell owns the chrome, just render content ── -->
    <ng-container *ngIf="isShellHosted">
      <app-wearables></app-wearables>
    </ng-container>

    <!-- ── Standalone: wrap with AmexPageShellComponent for full chrome ── -->
    <ng-container *ngIf="!isShellHosted">
      <amex-page-shell
        portalStyle="onls"
        portalTitle="ONLS Helper Tool"
        pageTitle="AMEX WEARABLES"
        [tabs]="tabs"
        activeTabId="misc"
        [subItems]="miscSubItems"
        activeSubId="wearables"
        [showSidebar]="true"
        (tabClick)="onTabClick($event)"
        (subClick)="onSubClick($event)"
        (logout)="onLogout()">

        <app-wearables [showPageHeader]="false"></app-wearables>

      </amex-page-shell>
    </ng-container>
  `,
})
export class WearablesShellWrapperComponent {

  isShellHosted: boolean;

  constructor(@Optional() @Inject(SHELL_HOSTED) shellHosted: boolean) {
    this.isShellHosted = !!shellHosted;
  }

  // ── Matches shell's header tabs exactly ────────────────────────────────────
  tabs: AmexTabItem[] = [
    { id: 'bta',      label: 'BTA'                        },
    { id: 'account',  label: 'Online Account Services'     },
    { id: 'supp',     label: 'Supplementary Access Helper' },
    { id: 'offers',   label: 'Offers'                      },
    { id: 'benefits', label: 'Benefits'                    },
    { id: 'misc',     label: 'Misc'                        },
  ];

  // ── Matches shell's Misc sub-items exactly ─────────────────────────────────
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

  onTabClick(_id: string) {}
  onSubClick(_id: string) {}
  onLogout() { localStorage.clear(); window.location.reload(); }
}