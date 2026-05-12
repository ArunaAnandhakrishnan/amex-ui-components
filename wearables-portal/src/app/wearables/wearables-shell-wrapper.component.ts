import { Component } from '@angular/core';
import { AmexPageShellComponent, AmexTabItem } from '@vn-core-ui-components/ui';
import { WearablesComponent } from './wearables.component';

@Component({
  selector: 'app-wearables-shell-wrapper',
  standalone: true,
  imports: [AmexPageShellComponent, WearablesComponent],
  template: `
    <amex-page-shell
      portalStyle="onls"
      portalTitle="ONLS Helper Tool"
      pageTitle="AMEX WEARABLES"
      [tabs]="onlsTabs"
      activeTabId="misc"
      [subItems]="onlsSubItems"
      activeSubId="wearables"
      [showSidebar]="true"
      (tabClick)="onTabClick($event)"
      (subClick)="onSubClick($event)"
      (logout)="onLogout()">

      <!-- showPageHeader=false → shell already renders pageTitle banner above -->
      <app-wearables [showPageHeader]="false"></app-wearables>

    </amex-page-shell>
  `,
})
export class WearablesShellWrapperComponent {

  // ── Matches screenshot row 1 exactly ──
  onlsTabs: AmexTabItem[] = [
    { id: 'misc',            label: 'MISC'                    },
    { id: 'online-acct',     label: 'ONLINE ACCOUNT SERVICES' },
    { id: 'statements',      label: 'STATEMENTS'              },
    { id: 'point-booster',   label: 'POINT BOOSTER'           },
    { id: 'change-password', label: 'CHANGE PASSWORD'         },
    { id: 'centurion',       label: 'CENTURION'               },
    { id: 'vat-invoice',     label: 'VAT INVOICE'             },
  ];

  // ── Matches screenshot row 2 exactly ──
  onlsSubItems: AmexTabItem[] = [
    { id: 'priority',  label: 'ENROLL FOR PRIORITY PASS™' },
    { id: 'supp',      label: 'Supplementary Access'       },
    { id: 'wallet',    label: 'Digital Wallet'             },
    { id: 'wearables', label: 'AMEX Wearables'             },
    { id: 'bcrb',      label: 'BCRB Report'                },
    { id: 'aecb',      label: 'AECB UPLOAD'                },
  ];

  onTabClick(_id: string) {}
  onSubClick(_id: string) {}
  onLogout() { localStorage.clear(); window.location.reload(); }
}