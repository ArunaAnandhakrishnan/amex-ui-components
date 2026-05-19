import { Component, Optional, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AmexPageShellComponent,
  AmexPortalLayoutConfig,
  AmexTabItem,
} from '@vn-core-ui-components/ui';
import { WearablesComponent } from './wearables.component';
import { SHELL_HOSTED } from '../core/tokens/shell.token';

@Component({
  selector: 'app-wearables-shell-wrapper',
  standalone: true,
  imports: [CommonModule, AmexPageShellComponent, WearablesComponent],
  template: `
    <amex-page-shell
      portalStyle="onls"
      portalTitle="ONLS Helper Tool"
      [config]="shellConfig"
      (tabClick)="onTabClick($event)"
      (subClick)="onSubClick($event)"
      (logout)="onLogout()"
    >
      <app-wearables></app-wearables>
    </amex-page-shell>
  `,
})
export class WearablesShellWrapperComponent {

  isShellHosted: boolean;

  constructor(@Optional() @Inject(SHELL_HOSTED) shellHosted: boolean) {
    this.isShellHosted = !!shellHosted;
  }

  // Note: The shellConfig getter determines the layout configuration based on whether the component is shell-hosted or standalone.
        // [tabs]="tabs"
      //   pageTitle="AMEX WEARABLES"
      // pageSubtitle="Manage wearable devices for cardmembers"
      //   activeTabId="misc"
      // [subItems]="miscSubItems"
      // activeSubId="wearables"

  /**
   * KEY LOGIC:
   * Shell-hosted  → header=false, footer=false, sidebar=false
   *                 Shell already provides its own chrome.
   *                 AmexPageShellComponent still consumed — just embedded mode.
   *
   * Standalone    → header=true, footer=true, sidebar=false
   *                 Full ONLS chrome rendered by AmexPageShellComponent.
   *                 Sidebar false because wearables has no sidebar nav.
   */
  get shellConfig(): AmexPortalLayoutConfig {
    if (this.isShellHosted) {
      return {
        header:  { visible: false },
        footer:  { visible: false },
        sidebar: { visible: false },
      };
    }
    return {
      header:  { visible: true },
      footer:  { visible: true, text: '© American Express. All rights reserved.' },
      sidebar: { visible: true, items: [] },
    };
  }

  // Tabs shown only in standalone mode
  // (shell has its own tabs — these are ignored when shell-hosted
  //  because the shell renders the tab bar itself)
  tabs: AmexTabItem[] = [
    { id: 'bta',      label: 'BTA'                        },
    { id: 'account',  label: 'Online Account Services'     },
    { id: 'supp',     label: 'Supplementary Access Helper' },
    { id: 'offers',   label: 'Offers'                      },
    { id: 'benefits', label: 'Benefits'                    },
    { id: 'misc',     label: 'Misc'                        },
  ];

  miscSubItems: AmexTabItem[] = [
    { id: 'pay-with-points', label: 'Select & Pay With Points'  },
    { id: 'digital-wallet',  label: 'Digital Wallet'            },
    { id: 'wearables',       label: 'AMEX Wearables'            },
    { id: 'pin-unblock',     label: 'PIN Unblock'               },
    { id: 'sms-status',      label: 'SMS Status'                },
    { id: 'priority-pass',   label: 'ENROLL FOR PRIORITY PASS™' },
    { id: 'valueback',       label: 'ValueBack'                 },
    { id: 'pccm-ftp',        label: 'Pccm Ftp Sequence Number'  },
  ];

  onTabClick(_id: string): void {}
  onSubClick(_id: string): void {}
  onLogout(): void {
    localStorage.clear();
    window.location.reload();
  }
}