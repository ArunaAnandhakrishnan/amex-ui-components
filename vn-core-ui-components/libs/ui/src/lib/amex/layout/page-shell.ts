import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ContentChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexTopNavBarComponent, AmexNavPortalStyle } from '../navigation/top-nav-bar';
import { AmexTabBarComponent, AmexTabItem } from '../navigation/tab-bar';
import { AmexSidebarMenuComponent, AmexSidebarMenuItem } from '../navigation/sidebar-menu';
import { AmexPageHeaderComponent } from '../navigation/page-header';
import { AmexDashboardMenuBarComponent, AmexMenuBarLink } from '../navigation/dashboard-menu-bar';

// ─── Approach 3: Config-driven interfaces ────────────────────────────────────

export interface AmexPageShellHeaderConfig {
  title?: string;
  logoUrl?: string;
  visible?: boolean;
}

export interface AmexPageShellFooterConfig {
  visible?: boolean;
  text?: string;
}

export interface AmexPageShellConfig {
  header?: AmexPageShellHeaderConfig;
  footer?: AmexPageShellFooterConfig;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * AmexPageShellComponent
 * ──────────────────────────────────────────────────────────────────────
 * Hybrid page-layout component built from the PDF spec ("Approach 1–4
 * combined") that wraps all AMEX portal chrome into a single reusable shell.
 *
 * Supports three AMEX portal styles:
 *   • onls  – ONLS / Hub / Supp Access / Lounge / Wearables / Pay-with-Points
 *   • oms   – Online Merchant Services
 *   • bcrb  – BCRB Reports
 *
 * Layout:
 *   [Top Nav Bar]
 *   [Tab Bar  + optional sub-row]          (onls / oms only)
 *   [Dashboard Menu Bar]                   (bcrb only)
 *   ┌─────────────────────────────────────┐
 *   │ Sidebar  │  [Page Header]           │
 *   │          │  <ng-content>            │
 *   └─────────────────────────────────────┘
 *   [Footer]
 *
 * Customization strategies (all work together):
 *   1. @Input() properties     – quick config for common props
 *   2. ng-content projection   – [header], [footer], default slot
 *   3. [config] object         – centralized PageShellConfig
 *   4. @Input() TemplateRef    – full template override for header/footer
 *
 * Usage (simple):
 *   <amex-page-shell
 *     portalStyle="onls"
 *     portalTitle="ONLS Helper Tool"
 *     pageTitle="PRIORITY PASS™ ENROLLMENT"
 *     [tabs]="tabs"
 *     activeTabId="misc">
 *     Page content here
 *   </amex-page-shell>
 *
 * Usage (full content projection):
 *   <amex-page-shell [config]="config" portalStyle="oms">
 *     <div header>Custom header override</div>
 *     <router-outlet></router-outlet>
 *     <div footer>Custom footer override</div>
 *   </amex-page-shell>
 *
 * Usage (template injection):
 *   <amex-page-shell [headerTemplate]="myHdr" portalStyle="bcrb">
 *     Page content
 *   </amex-page-shell>
 *   <ng-template #myHdr>
 *     <div>My fully custom header</div>
 *   </ng-template>
 */
@Component({
  selector: 'amex-page-shell',
  standalone: true,
  imports: [
    CommonModule,
    AmexTopNavBarComponent,
    AmexTabBarComponent,
    AmexSidebarMenuComponent,
    AmexPageHeaderComponent,
    AmexDashboardMenuBarComponent,
  ],
  template: `
    <div class="shell" [attr.data-portal]="portalStyle">

      <!-- ══════════════════════════════════════════════════════════════
           APPROACH 4: Template injection for header
           Falls back to approach 2 (ng-content [header]) then
           approach 1/3 (AmexTopNavBar auto-rendered).
      ══════════════════════════════════════════════════════════════ -->
      <header class="shell__header" *ngIf="resolvedHeaderVisible">

        <!-- ── Template injection override (Approach 4) ── -->
        <ng-container *ngIf="headerTemplate; else defaultNavBar">
          <ng-container [ngTemplateOutlet]="headerTemplate"></ng-container>
        </ng-container>

        <!-- ── Default: AmexTopNavBar driven by inputs/config (Approach 1 & 3) ── -->
        <ng-template #defaultNavBar>
          <!-- Approach 2: consumer projected a [header] slot -->
          <ng-content select="[header]"></ng-content>
          <!-- Approach 1 & 3: auto-render the portal nav bar -->
          <amex-top-nav-bar
            [portalStyle]="portalStyle"
            [portalTitle]="resolvedPortalTitle"
            [username]="username"
            [omsServiceName]="omsServiceName"
            (logout)="logout.emit()"
            (menuToggle)="menuToggle.emit()">
          </amex-top-nav-bar>
        </ng-template>

      </header>

      <!-- ══════════════════════════════════════════════════════════════
           TAB BAR  (ONLS & OMS portals — sits between top nav and body)
      ══════════════════════════════════════════════════════════════ -->
      <div class="shell__tabs" *ngIf="tabs.length && portalStyle !== 'bcrb'">
        <amex-tab-bar
          [portalStyle]="portalStyle === 'oms' ? 'oms' : 'onls'"
          [tabs]="tabs"
          [activeTabId]="activeTabId"
          [subItems]="subItems"
          [activeSubId]="activeSubId"
          (tabClick)="tabClick.emit($event)"
          (subClick)="subClick.emit($event)">
        </amex-tab-bar>
      </div>

      <!-- ══════════════════════════════════════════════════════════════
           DASHBOARD MENU BAR  (BCRB only — Bureau dropdown + report links)
      ══════════════════════════════════════════════════════════════ -->
      <div class="shell__dashboard-bar" *ngIf="portalStyle === 'bcrb' && showDashboardBar">
        <amex-dashboard-menu-bar
          [showBureauDropdown]="showBureauDropdown"
          [bureauLabel]="bureauLabel"
          [bureauOptions]="bureauOptions"
          [activeBureauId]="activeBureauId"
          [links]="dashboardLinks"
          [activeLinkId]="activeDashboardLinkId"
          (bureauChange)="bureauChange.emit($event)"
          (linkClick)="dashboardLinkClick.emit($event)">
        </amex-dashboard-menu-bar>
      </div>

      <!-- ══════════════════════════════════════════════════════════════
           BODY ROW: sidebar + main content
      ══════════════════════════════════════════════════════════════ -->
      <div class="shell__body">

        <!-- ── Sidebar ─────────────────────────────────────────── -->
        <aside class="shell__sidebar" *ngIf="showSidebar">
          <amex-sidebar-menu
            [portalStyle]="portalStyle === 'bcrb' ? 'bcrb' : portalStyle === 'oms' ? 'oms' : 'onls'"
            [items]="sidebarItems"
            [activeId]="activeSidebarId"
            (itemClick)="sidebarItemClick.emit($event)">
          </amex-sidebar-menu>
        </aside>

        <!-- ── Main content column ─────────────────────────────── -->
        <div class="shell__content">

          <!-- Page header banner (above content, inside content col) -->
          <div class="shell__page-header" *ngIf="pageTitle">
            <amex-page-header
              [portalStyle]="portalStyle === 'oms' ? 'oms' : 'onls'"
              [title]="pageTitle"
              [subtitle]="pageSubtitle"
              [ctaLabel]="pageCtaLabel"
              (ctaClick)="pageCtaClick.emit()">
            </amex-page-header>
          </div>

          <!-- Default content slot (Approach 2) -->
          <div class="shell__content-body">
            <ng-content></ng-content>
          </div>

        </div>
      </div>

      <!-- ══════════════════════════════════════════════════════════════
           FOOTER
      ══════════════════════════════════════════════════════════════ -->
      <footer class="shell__footer" *ngIf="resolvedFooterVisible">

        <!-- Approach 4: template injection override -->
        <ng-container *ngIf="footerTemplate; else defaultFooter">
          <ng-container [ngTemplateOutlet]="footerTemplate"></ng-container>
        </ng-container>

        <!-- Approach 2: consumer projected a [footer] slot -->
        <!-- Approach 1 & 3: auto-render default footer -->
        <ng-template #defaultFooter>
          <ng-content select="[footer]"></ng-content>
          <div class="shell__footer-default" *ngIf="!hasProjectedFooter">
            <span class="shell__footer-text">{{ resolvedFooterText }}</span>
          </div>
        </ng-template>

      </footer>

    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    /* ── Root shell container ───────────────────────────────── */
    .shell {
      display: flex;
      flex-direction: column;
      min-height: 100%;
      background: #f4f4f4;
    }

    /* ── Header slot ────────────────────────────────────────── */
    .shell__header {
      flex-shrink: 0;
    }

    /* ── Tab bar slot ───────────────────────────────────────── */
    .shell__tabs {
      flex-shrink: 0;
    }

    /* ── Dashboard menu bar (BCRB) ──────────────────────────── */
    .shell__dashboard-bar {
      flex-shrink: 0;
    }

    /* ── Body: sidebar + main ───────────────────────────────── */
    .shell__body {
      display: flex;
      flex: 1;
      min-height: 0;
    }

    /* ── Sidebar ────────────────────────────────────────────── */
    .shell__sidebar {
      flex-shrink: 0;
    }

    /* ── Main content column ────────────────────────────────── */
    .shell__content {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      overflow: hidden;
    }

    .shell__page-header {
      flex-shrink: 0;
    }

    .shell__content-body {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
    }

    /* ── Footer ─────────────────────────────────────────────── */
    .shell__footer {
      flex-shrink: 0;
    }

    .shell__footer-default {
      background: #fff;
      border-top: 1px solid #d8d8d8;
      padding: 8px 16px;
      font-size: 11px;
      color: #888;
      text-align: center;
    }

    /* ── ONLS: light background body ───────────────────────── */
    .shell[data-portal="onls"] .shell__content-body {
      background: #fff;
    }

    /* ── OMS: slightly off-white body ───────────────────────── */
    .shell[data-portal="oms"] .shell__content-body {
      background: #fafafa;
    }

    /* ── BCRB: light gray body ───────────────────────────────── */
    .shell[data-portal="bcrb"] .shell__content-body {
      background: #f7f7f7;
    }
  `],
})
export class AmexPageShellComponent {

  // ── Approach 1: Simple input-based configuration ─────────────────────────

  /** Portal visual style — drives nav bar, sidebar, and body background */
  @Input() portalStyle: AmexNavPortalStyle = 'onls';

  /** Portal title shown in the top nav bar header */
  @Input() portalTitle?: string;

  /** Username displayed in BCRB indigo bar top-right */
  @Input() username = '';

  /** OMS service name (e.g. "Merchant Services") */
  @Input() omsServiceName = 'Merchant Services';

  /** Whether to render the header (top nav) region */
  @Input() showHeader = true;

  /** Whether to render the footer region */
  @Input() showFooter = true;

  /** Footer text for the default auto-rendered footer */
  @Input() footerText?: string;

  // ── Tab Bar inputs ────────────────────────────────────────────────────────

  /** Primary tabs for ONLS/OMS tab bar */
  @Input() tabs: AmexTabItem[] = [];

  /** Currently active tab id */
  @Input() activeTabId = '';

  /** Optional sub-row nav items (ONLS — Priority Pass, Supp Access, etc.) */
  @Input() subItems: AmexTabItem[] = [];

  /** Active sub-item id */
  @Input() activeSubId = '';

  // ── Sidebar inputs ────────────────────────────────────────────────────────

  /** Whether to show the sidebar */
  @Input() showSidebar = true;

  /** Sidebar menu items (for BCRB/OMS styles; ignored for ONLS hatched panel) */
  @Input() sidebarItems: AmexSidebarMenuItem[] = [];

  /** Active sidebar item id */
  @Input() activeSidebarId = '';

  // ── Page header inputs ────────────────────────────────────────────────────

  /** Section banner title (e.g. "PRIORITY PASS™ ENROLLMENT") */
  @Input() pageTitle = '';

  /** Optional subtitle shown below the page title */
  @Input() pageSubtitle = '';

  /** Optional CTA button label in the page header (e.g. "Request New Report +") */
  @Input() pageCtaLabel = '';

  // ── BCRB Dashboard Menu Bar inputs ────────────────────────────────────────

  /** Show the BCRB dashboard menu bar (bureau selector + links row) */
  @Input() showDashboardBar = true;

  /** Show the Bureau dropdown in the dashboard menu bar */
  @Input() showBureauDropdown = true;

  /** Label for the bureau dropdown */
  @Input() bureauLabel = 'Bureau';

  /** Bureau options list */
  @Input() bureauOptions: AmexMenuBarLink[] = [
    { id: 'aecb',  label: 'AECB'  },
    { id: 'simah', label: 'SIMAH' },
  ];

  /** Currently selected bureau id */
  @Input() activeBureauId = 'aecb';

  /** Sub-nav links in the dashboard menu bar */
  @Input() dashboardLinks: AmexMenuBarLink[] = [];

  /** Currently active dashboard link id */
  @Input() activeDashboardLinkId = '';

  // ── Approach 3: Config-driven object ─────────────────────────────────────

  /**
   * Provide a single config object to centrally control header/footer.
   * Individual @Input() values act as fallbacks when config is absent.
   *
   * @example
   *   pageConfig = {
   *     header: { title: 'Dashboard', visible: true },
   *     footer: { visible: true, text: '© American Express' }
   *   }
   *   <amex-page-shell [config]="pageConfig"></amex-page-shell>
   */
  @Input() config?: AmexPageShellConfig;

  // ── Approach 4: Template injection ───────────────────────────────────────

  /**
   * Inject a fully custom header TemplateRef.
   * When provided, replaces the entire header region.
   *
   * @example
   *   <amex-page-shell [headerTemplate]="myHdr">...</amex-page-shell>
   *   <ng-template #myHdr><app-custom-header></app-custom-header></ng-template>
   */
  @Input() headerTemplate?: TemplateRef<unknown>;

  /**
   * Inject a fully custom footer TemplateRef.
   * When provided, replaces the entire footer region.
   */
  @Input() footerTemplate?: TemplateRef<unknown>;

  // ── Output events ─────────────────────────────────────────────────────────

  /** Fires when the "Log Out" / "LOG OUT" button is clicked */
  @Output() logout = new EventEmitter<void>();

  /** Fires when the BCRB hamburger menu button is clicked */
  @Output() menuToggle = new EventEmitter<void>();

  /** Fires when a main tab is clicked; emits the tab id */
  @Output() tabClick = new EventEmitter<string>();

  /** Fires when a sub-nav item is clicked; emits the sub-item id */
  @Output() subClick = new EventEmitter<string>();

  /** Fires when a sidebar menu item is clicked; emits the item id */
  @Output() sidebarItemClick = new EventEmitter<string>();

  /** Fires when the page header CTA button is clicked */
  @Output() pageCtaClick = new EventEmitter<void>();

  /** Fires when the Bureau dropdown value changes (BCRB); emits the bureau id */
  @Output() bureauChange = new EventEmitter<string>();

  /** Fires when a dashboard link is clicked (BCRB); emits the link id */
  @Output() dashboardLinkClick = new EventEmitter<string>();

  // ── Internal helpers: config resolution ──────────────────────────────────

  /**
   * Whether the header section should be rendered.
   * Config object takes priority, then the @Input() showHeader value.
   */
  get resolvedHeaderVisible(): boolean {
    return this.config?.header?.visible ?? this.showHeader;
  }

  /**
   * Whether the footer section should be rendered.
   * Config object takes priority, then the @Input() showFooter value.
   */
  get resolvedFooterVisible(): boolean {
    return this.config?.footer?.visible ?? this.showFooter;
  }

  /** Portal title resolved from config first, then @Input() portalTitle */
  get resolvedPortalTitle(): string {
    return this.config?.header?.title ?? this.portalTitle ?? 'ONLS Helper Tool';
  }

  /** Footer text resolved from config first, then @Input() footerText */
  get resolvedFooterText(): string {
    return this.config?.footer?.text ?? this.footerText ?? '© American Express. All rights reserved.';
  }

  /**
   * True when the consumer has projected content into the [footer] slot.
   * Used to suppress the default footer text when a projected footer exists.
   * (Approximated — Angular does not expose a native "has content" API for
   * select-based projection without a @ContentChild directive.)
   */
  get hasProjectedFooter(): boolean {
    return false; // Consumers can override by setting footerText = ''
  }
}
