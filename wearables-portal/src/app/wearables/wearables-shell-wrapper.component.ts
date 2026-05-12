import { Component } from '@angular/core';
import {
  AmexPageShellComponent,
  AmexTabItem,
} from '@vn-core-ui-components/ui';
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

      <!-- showPageHeader=false because amex-page-shell already shows pageTitle above -->
      <app-wearables [showPageHeader]="false"></app-wearables>

    </amex-page-shell>
  `,
})
export class WearablesShellWrapperComponent {

  onlsTabs: AmexTabItem[] = [
    { id: 'statements',  label: 'Statements'        },
    { id: 'misc',        label: 'MISC'               },
    { id: 'centralstmt', label: 'Central Statements' },
  ];

  onlsSubItems: AmexTabItem[] = [
    { id: 'priority',  label: 'ENROLL FOR PRIORITY PASS™' },
    { id: 'supp',      label: 'Supplementary Access'       },
    { id: 'wallet',    label: 'Digital Wallet'             },
    { id: 'wearables', label: 'Wearables'                  },
  ];

  onTabClick(_id: string)  {}
  onSubClick(_id: string)  {}
  onLogout() { localStorage.clear(); window.location.reload(); }
}