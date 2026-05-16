import { Component } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { CommonModule } from '@angular/common';

import {
  AmexPageShellComponent,
  AmexPortalLayoutConfig,
  AMEX_PORTAL_AUTH_ADAPTER,
  AMEX_PORTAL_NAVIGATION_ADAPTER,
  AMEX_PORTAL_THEME_ADAPTER,
  AMEX_PORTAL_ANALYTICS_ADAPTER,
  AMEX_PORTAL_USER_CONTEXT_ADAPTER,
  AMEX_PORTAL_FEATURE_FLAG_ADAPTER,
  type AmexPortalAuthAdapter,
  type AmexPortalNavigationAdapter,
  type AmexPortalThemeAdapter,
  type AmexPortalAnalyticsAdapter,
  type AmexPortalUserContextAdapter,
  type AmexPortalFeatureFlagAdapter,
} from './page-shell';

// ─────────────────────────────────────────────────────────────────────────────
// SHARED MOCK DATA
// ─────────────────────────────────────────────────────────────────────────────

const MAIN_TABS = [
  { id: 'statements',  label: 'Statements' },
  { id: 'misc',        label: 'MISC' },
  { id: 'centralstmt', label: 'Central Statements' },
];

const SUB_ITEMS = [
  { id: 'priority',  label: 'ENROLL FOR PRIORITY PASS™' },
  { id: 'supp',      label: 'Supplementary Access' },
  { id: 'wallet',    label: 'Digital Wallet' },
  { id: 'wearables', label: 'Wearables' },
];

const BCRB_ITEMS = [
  { id: 'consumer-monthly', label: 'Consumer Monthly Audit Report' },
  { id: 'corp-monthly',     label: 'Corporate Monthly Audit Report' },
  { id: 'consumer-data',    label: 'Consumer Data Audit Report' },
  { id: 'corp-data',        label: 'Corporate Data Audit Report' },
  { id: 'consumer-full',    label: 'Consumer Full Report' },
  { id: 'consumer-history', label: 'Consumer History Report' },
  { id: 'corp-history',     label: 'Corporate History Report' },
];

const BUREAU_OPTIONS = [
  { id: 'aecb',  label: 'AECB' },
  { id: 'simah', label: 'SIMAH' },
];

// ─────────────────────────────────────────────────────────────────────────────
// MOCK ADAPTER IMPLEMENTATIONS (Storybook only — not production code)
// ─────────────────────────────────────────────────────────────────────────────

class MockAuthAdapter implements AmexPortalAuthAdapter {
  getUsername() { return 'john.doe@amex.com'; }
  logout()      { console.log('[MockAuthAdapter] logout called'); }
}

class MockNavAdapter implements AmexPortalNavigationAdapter {
  getTabs()                  { return MAIN_TABS; }
  getSidebarItems()          { return BCRB_ITEMS; }
  onTabClick(id: string)     { console.log('[MockNavAdapter] tab:', id); }
  onSidebarClick(id: string) { console.log('[MockNavAdapter] sidebar:', id); }
}

class MockThemeAdapter implements AmexPortalThemeAdapter {
  getTheme()                                        { return 'onls'; }
  applyTheme(t: string)                             { console.log('[MockThemeAdapter] applyTheme:', t); }
  // FIX 5: onThemeChange was missing — added stub so interface is fully satisfied.
  onThemeChange(_cb: (t: string) => void): void     { return undefined; }
}

class MockAnalyticsAdapter implements AmexPortalAnalyticsAdapter {
  trackPageView(page: string, meta?: Record<string, unknown>) {
    console.log('[MockAnalyticsAdapter] pageView:', page, meta);
  }
  trackEvent(event: string, meta?: Record<string, unknown>) {
    console.log('[MockAnalyticsAdapter] event:', event, meta);
  }
}

class MockUserContextAdapter implements AmexPortalUserContextAdapter {
  getUserId()          { return 'USR-001'; }
  getRoles()           { return ['AGENT', 'VIEWER']; }
  hasRole(r: string)   { return ['AGENT', 'VIEWER'].includes(r); }
  getLocale()          { return 'en-AE'; }
}

class MockFeatureFlagAdapter implements AmexPortalFeatureFlagAdapter {
  private flags: Record<string, boolean> = {
    'show-beta-reports': true,
    'enable-wearables':  true,
    'new-dashboard-ui':  false,
  };
  isEnabled(flag: string) { return this.flags[flag] ?? false; }
  getFlags()              { return { ...this.flags }; }
}

// ─────────────────────────────────────────────────────────────────────────────
// WRAPPER: CONTENT PROJECTION
// ─────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-content-projection-wrapper',
  standalone: true,
  imports: [CommonModule, AmexPageShellComponent],
  template: `
    <div style="height:560px">

      <amex-page-shell
        portalStyle="onls"
        [showSidebar]="false"
        [showCustomHeader]="true"
        [showCustomFooter]="true"
      >

        <!-- CUSTOM HEADER -->
        <div
          header
          style="
            background:#006fcf;color:#fff;padding:8px 16px;
            display:flex;align-items:center;gap:12px
          "
        >
          <div
            style="
              background:#fff;color:#006fcf;font-weight:900;font-size:11px;
              width:36px;height:36px;display:flex;align-items:center;
              justify-content:center;border-radius:3px;line-height:1.1;text-align:center
            "
          >AM<br/>EX</div>

          <span style="font-size:15px;font-weight:bold">
            Custom Projected Header
          </span>

          <button
            style="
              margin-left:auto;background:#fff;border:none;color:#006fcf;
              font-size:11px;padding:4px 12px;cursor:pointer;border-radius:2px
            "
          >Log Out</button>
        </div>

        <!-- BODY -->
        <div style="padding:24px;font-family:Arial,sans-serif">
          <div style="background:#e3f2fd;border:1px solid #90caf9;border-radius:4px;padding:12px 16px;font-size:13px;color:#1a237e;margin-bottom:16px">
            <strong>Approach 2 — Content Projection ✓</strong><br/><br/>
            Header + footer injected via <code>&lt;div header&gt;</code> and <code>&lt;div footer&gt;</code>.
          </div>
          <p style="font-size:13px;color:#555">Main content uses default ng-content slot.</p>
        </div>

        <!-- CUSTOM FOOTER -->
        <div
          footer
          style="
            background:#fff;border-top:1px solid #d8d8d8;padding:8px 16px;
            display:flex;justify-content:center;gap:12px;font-size:11px;color:#888
          "
        >
          <a href="#" style="color:#006fcf">Privacy Policy</a>
          <span>|</span>
          <a href="#" style="color:#006fcf">Cookie Policy</a>
          <span>|</span>
          <span>© American Express</span>
        </div>

      </amex-page-shell>

    </div>
  `,
})
class StoryContentProjectionWrapperComponent {}

// ─────────────────────────────────────────────────────────────────────────────
// WRAPPER: TEMPLATE INJECTION
// ─────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-template-wrapper',
  standalone: true,
  imports: [CommonModule, AmexPageShellComponent],
  template: `
    <div style="height:560px">

      <amex-page-shell
        portalStyle="bcrb"
        username="ssharaf_onlshelper"
        [headerTemplate]="customHeader"
        [showDashboardBar]="true"
        [bureauOptions]="bureauOptions"
        [sidebarItems]="sidebarItems"
        activeSidebarId="corp-monthly"
      >

        <div style="padding:20px;font-family:Arial,sans-serif">
          <strong style="font-size:14px;display:block;margin-bottom:10px">
            Corporate Monthly Audit Report ( REP-010 )
          </strong>
          <div style="background:#e8eaf6;border:1px solid #9fa8da;border-radius:4px;padding:12px 16px;font-size:13px;color:#283593">
            <strong>Approach 4 — Template Injection ✓</strong><br/><br/>
            Full header overridden using <code>[headerTemplate]</code>.
          </div>
        </div>

      </amex-page-shell>

      <ng-template #customHeader>
        <div style="background:#3d4dac;display:flex;align-items:center;justify-content:space-between;padding:0 16px;height:48px">
          <div style="display:flex;align-items:center;gap:12px">
            <span style="color:#fff;font-size:20px;cursor:pointer">☰</span>
            <span style="color:#fff;font-size:16px;font-weight:bold">BCRB Reports — TemplateRef Header</span>
          </div>
          <span style="color:#fff;font-size:13px">User :- ssharaf_onlshelper</span>
        </div>
      </ng-template>

    </div>
  `,
})
class StoryTemplateWrapperComponent {
  readonly bureauOptions = BUREAU_OPTIONS;
  readonly sidebarItems  = BCRB_ITEMS;
}

// ─────────────────────────────────────────────────────────────────────────────
// WRAPPER: COMBINED (RECOMMENDED)
// ─────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-combined-wrapper',
  standalone: true,
  imports: [CommonModule, AmexPageShellComponent],
  template: `
    <div style="height:620px">

      <amex-page-shell
        portalStyle="onls"
        [config]="pageConfig"
        [tabs]="tabs"
        activeTabId="misc"
        [subItems]="subItems"
        activeSubId="priority"
        pageTitle="PRIORITY PASS™ ENROLLMENT"
        pageSubtitle="Manage Priority Pass benefit for cardmembers"
        pageCtaLabel="Enroll Now"
        [showCustomFooter]="true"
      >

        <div style="padding:20px;font-family:Arial,sans-serif">
          <div style="background:#e8f5e9;border:1px solid #c8e6c9;border-radius:4px;padding:12px 16px;margin-bottom:16px;font-size:13px;color:#2e7d32">
            ✓ Priority Pass enrollment is active.
          </div>
          <div style="background:#fff8e1;border:1px solid #ffe082;border-radius:4px;padding:12px 16px;font-size:12px;color:#5d4037">
            <strong>Approach 5 — Recommended Combined ✓</strong><br/><br/>
            Combines: config + tabs + projected footer.
          </div>
        </div>

        <div
          footer
          style="background:#fff;border-top:1px solid #d8d8d8;padding:8px 16px;display:flex;justify-content:center;gap:12px;font-size:11px;color:#888"
        >
          <a href="#" style="color:#006fcf">Privacy Policy</a>
          <span>|</span>
          <a href="#" style="color:#006fcf">Cookie Policy</a>
          <span>|</span>
          <span>© American Express</span>
        </div>

      </amex-page-shell>

    </div>
  `,
})
class StoryCombinedWrapperComponent {
  readonly tabs     = MAIN_TABS;
  readonly subItems = SUB_ITEMS;

  // FIX 1: header.title is not a valid field in AmexPortalHeaderConfig.
  // Removed invalid 'title' property — only visible/customTemplate/customComponent are valid.
  readonly pageConfig: AmexPortalLayoutConfig = {
    header: { visible: true },
    footer: { visible: true, text: '© American Express' },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// WRAPPER: ADAPTER INJECTION DEMO
// Shows how each portal provides its own adapter implementations via DI.
// ─────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-adapter-injection-wrapper',
  standalone: true,
  imports: [CommonModule, AmexPageShellComponent],
  providers: [
    { provide: AMEX_PORTAL_AUTH_ADAPTER,         useClass: MockAuthAdapter },
    { provide: AMEX_PORTAL_NAVIGATION_ADAPTER,   useClass: MockNavAdapter },
    { provide: AMEX_PORTAL_THEME_ADAPTER,        useClass: MockThemeAdapter },
    { provide: AMEX_PORTAL_ANALYTICS_ADAPTER,    useClass: MockAnalyticsAdapter },
    { provide: AMEX_PORTAL_USER_CONTEXT_ADAPTER, useClass: MockUserContextAdapter },
    { provide: AMEX_PORTAL_FEATURE_FLAG_ADAPTER, useClass: MockFeatureFlagAdapter },
  ],
  template: `
    <div style="height:560px">

      <amex-page-shell
        portalStyle="onls"
        pageTitle="ADAPTER INJECTION DEMO"
        pageSubtitle="All adapters provided via DI — check console for tracking logs"
        [showSidebar]="false"
        [showHeader]="true"
        [showFooter]="true"
        footerText="© American Express — Adapter Demo"
        (logout)="onLogout()"
        (tabClick)="onTab($event)"
      >

        <div style="padding:20px;font-family:Arial,sans-serif">

          <div style="background:#e8eaf6;border:1px solid #9fa8da;border-radius:4px;padding:16px;margin-bottom:16px;font-size:13px;color:#283593">
            <strong>Adapter Injection Pattern ✓</strong><br/><br/>
            This story provides <strong>6 adapters</strong> via Angular DI:
            <ul style="margin:8px 0 0 16px;line-height:1.8">
              <li><code>AMEX_PORTAL_AUTH_ADAPTER</code> → MockAuthAdapter</li>
              <li><code>AMEX_PORTAL_NAVIGATION_ADAPTER</code> → MockNavAdapter</li>
              <li><code>AMEX_PORTAL_THEME_ADAPTER</code> → MockThemeAdapter</li>
              <li><code>AMEX_PORTAL_ANALYTICS_ADAPTER</code> → MockAnalyticsAdapter</li>
              <li><code>AMEX_PORTAL_USER_CONTEXT_ADAPTER</code> → MockUserContextAdapter</li>
              <li><code>AMEX_PORTAL_FEATURE_FLAG_ADAPTER</code> → MockFeatureFlagAdapter</li>
            </ul>
          </div>

          <div style="background:#f3e5f5;border:1px solid #ce93d8;border-radius:4px;padding:12px 16px;font-size:12px;color:#4a148c">
            <strong>Shell never owns adapters.</strong><br/>
            Each microfrontend portal provides its own implementation.
            Open the browser console to see analytics + auth events fire.
          </div>

        </div>

      </amex-page-shell>

    </div>
  `,
})
class StoryAdapterInjectionWrapperComponent {
  onLogout()        { console.log('[Story] logout clicked'); }
  onTab(id: string) { console.log('[Story] tab clicked:', id); }
}

// ─────────────────────────────────────────────────────────────────────────────
// WRAPPER: FEATURE FLAGS DEMO
// Shows static config features + FeatureFlagAdapter gating inside portal content.
// ─────────────────────────────────────────────────────────────────────────────

@Component({
  selector: 'story-feature-flags-wrapper',
  standalone: true,
  imports: [CommonModule, AmexPageShellComponent],
  providers: [
    {
      provide: AMEX_PORTAL_FEATURE_FLAG_ADAPTER,
      useValue: {
        isEnabled: (flag: string) =>
          ({ 'show-beta-reports': true, 'enable-wearables': true, 'new-dashboard-ui': false })[flag] ?? false,
        getFlags: () => ({ 'show-beta-reports': true, 'enable-wearables': true, 'new-dashboard-ui': false }),
      } satisfies AmexPortalFeatureFlagAdapter,
    },
  ],
  template: `
    <div style="height:560px">

      <!-- FIX 3: Removed unused #shell template reference variable. -->
      <amex-page-shell
        portalStyle="onls"
        portalTitle="Feature Flag Demo"
        pageTitle="FEATURE FLAGS"
        [showSidebar]="false"
        [showHeader]="true"
        [showFooter]="true"
      >

        <div style="padding:20px;font-family:Arial,sans-serif">

          <div style="background:#e8f5e9;border:1px solid #c8e6c9;border-radius:4px;padding:16px;margin-bottom:16px;font-size:13px;color:#2e7d32">
            <strong>Feature Flag Adapter ✓</strong><br/><br/>
            Priority: <code>FeatureFlagAdapter</code> → <code>config.features</code> → runtime JSON.<br/>
            Open console to see flag resolution.
          </div>

          <table style="width:100%;border-collapse:collapse;font-size:12px">
            <thead>
              <tr style="background:#f5f5f5">
                <th style="padding:8px 12px;text-align:left;border-bottom:1px solid #ddd">Flag</th>
                <th style="padding:8px 12px;text-align:left;border-bottom:1px solid #ddd">Status (via Adapter)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding:8px 12px;border-bottom:1px solid #eee"><code>show-beta-reports</code></td>
                <td style="padding:8px 12px;border-bottom:1px solid #eee">
                  <span style="background:#e8f5e9;color:#2e7d32;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:bold">✓ ENABLED</span>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 12px;border-bottom:1px solid #eee"><code>enable-wearables</code></td>
                <td style="padding:8px 12px;border-bottom:1px solid #eee">
                  <span style="background:#e8f5e9;color:#2e7d32;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:bold">✓ ENABLED</span>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 12px"><code>new-dashboard-ui</code></td>
                <td style="padding:8px 12px">
                  <span style="background:#ffebee;color:#c62828;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:bold">✗ DISABLED</span>
                </td>
              </tr>
            </tbody>
          </table>

        </div>

      </amex-page-shell>

    </div>
  `,
})
class StoryFeatureFlagsWrapperComponent {}

// ─────────────────────────────────────────────────────────────────────────────
// META
// ─────────────────────────────────────────────────────────────────────────────

const meta: Meta<AmexPageShellComponent> = {
  title: 'AMEX/Layout/PageShell',

  component: AmexPageShellComponent,

  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        AmexPageShellComponent,
        StoryContentProjectionWrapperComponent,
        StoryTemplateWrapperComponent,
        StoryCombinedWrapperComponent,
        StoryAdapterInjectionWrapperComponent,
        StoryFeatureFlagsWrapperComponent,
      ],
    }),
  ],

  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# AmexPageShellComponent

Enterprise-ready Angular portal layout shell.

## Rendering Priority

### Header
1. \`[headerTemplate]\` — TemplateRef override
2. \`config.header.customComponent\` — dynamic Type<unknown> via ngComponentOutlet
3. \`[showCustomHeader]="true"\` + \`<div header>\` — content projection slot
4. Default AMEX top nav bar

### Footer
1. \`[footerTemplate]\` — TemplateRef override
2. \`config.footer.customComponent\` — dynamic Type<unknown> via ngComponentOutlet
3. \`[showCustomFooter]="true"\` + \`<div footer>\` — content projection slot
4. Default text footer

### Sidebar
1. \`[sidebarTemplate]\` — TemplateRef override
2. \`config.sidebar.customComponent\` — dynamic Type<unknown> via ngComponentOutlet
3. \`[showCustomSidebar]="true"\` + \`<div left-nav>\` — content projection slot
4. Default AmexSidebarMenuComponent

## Adapter Injection Tokens

| Adapter | Token | Purpose |
|---|---|---|
| Auth | \`AMEX_PORTAL_AUTH_ADAPTER\` | username, logout |
| Navigation | \`AMEX_PORTAL_NAVIGATION_ADAPTER\` | tabs, sidebar items, click handlers |
| Theme | \`AMEX_PORTAL_THEME_ADAPTER\` | active theme, applyTheme |
| Analytics | \`AMEX_PORTAL_ANALYTICS_ADAPTER\` | pageView, trackEvent |
| User Context | \`AMEX_PORTAL_USER_CONTEXT_ADAPTER\` | userId, roles, locale |
| Feature Flags | \`AMEX_PORTAL_FEATURE_FLAG_ADAPTER\` | isEnabled, getFlags |

## Feature Flag Resolution Priority
\`FeatureFlagAdapter\` → \`config.features\` map → runtime JSON \`features\` key

## Convenience Inputs
- \`[showHeader]\` — shortcut for \`config.header.visible\` (config always wins if both set)
- \`[showFooter]\` — shortcut for \`config.footer.visible\` (config always wins if both set)

## bootstrapPortal()
\`\`\`ts
bootstrapApplication(AppComponent, {
  providers: bootstrapPortal({
    authAdapter:      MyAuthAdapter,
    navAdapter:       MyNavAdapter,
    analyticsAdapter: MyAnalyticsAdapter,
    runtimeConfigUrl: '/assets/config/portal.json',
  }),
});
\`\`\`
        `,
      },
    },
  },

  tags: ['autodocs'],

  argTypes: {
    portalStyle: {
      control: 'select',
      options: ['onls', 'oms', 'bcrb'],
      description: 'Portal brand theme',
    },
    portalTitle: {
      control: 'text',
      description: 'Portal title shown in nav bar',
    },
    username: {
      control: 'text',
      description: 'Logged-in username. Overridden by AuthAdapter if provided.',
    },
    showHeader: {
      control: 'boolean',
      description: 'Convenience input — maps to config.header.visible. Config wins if both set.',
    },
    showFooter: {
      control: 'boolean',
      description: 'Convenience input — maps to config.footer.visible. Config wins if both set.',
    },
    showSidebar: {
      control: 'boolean',
      description: 'Maps to config.sidebar.visible',
    },
    showCustomHeader: {
      control: 'boolean',
      description: 'Enable content projection slot for header (Priority 3)',
    },
    showCustomFooter: {
      control: 'boolean',
      description: 'Enable content projection slot for footer (Priority 3)',
    },
    showCustomSidebar: {
      control: 'boolean',
      description: 'Enable content projection slot for sidebar (Priority 3)',
    },
    showDashboardBar: {
      control: 'boolean',
      description: 'BCRB only — show dashboard menu bar',
    },
    pageTitle: {
      control: 'text',
    },
    pageSubtitle: {
      control: 'text',
    },
    pageCtaLabel: {
      control: 'text',
    },
    footerText: {
      control: 'text',
    },
    activeTabId: {
      control: 'text',
    },
    activeSubId: {
      control: 'text',
    },
    activeSidebarId: {
      control: 'text',
    },
    tabs: {
      control: 'object',
    },
    subItems: {
      control: 'object',
    },
    sidebarItems: {
      control: 'object',
    },
    config: {
      control: 'object',
      description: 'Full AmexPortalLayoutConfig. Merges with runtime JSON config. Takes priority over all convenience inputs.',
    },
    headerTemplate: {
      table: { disable: true },
      description: 'TemplateRef — Priority 1 header override',
    },
    footerTemplate: {
      table: { disable: true },
      description: 'TemplateRef — Priority 1 footer override',
    },
    sidebarTemplate: {
      table: { disable: true },
      description: 'TemplateRef — Priority 1 sidebar override',
    },
  },
};

export default meta;

type Story = StoryObj<AmexPageShellComponent>;

// ─────────────────────────────────────────────────────────────────────────────
// STORY 1 — INPUT BASED
// ─────────────────────────────────────────────────────────────────────────────

export const InputBased: Story = {
  name: '1 · Input Based',
  args: {
    portalStyle:  'onls',
    portalTitle:  'ONLS Helper Tool',
    pageTitle:    'PRIORITY PASS™ ENROLLMENT',
    pageSubtitle: 'Manage Priority Pass benefit for cardmembers',
    pageCtaLabel: 'Enroll Now',
    showHeader:   true,
    showFooter:   true,
    showSidebar:  true,
    footerText:   '© American Express. All rights reserved.',
    activeTabId:  'misc',
    activeSubId:  'priority',
    tabs:         MAIN_TABS,
    subItems:     SUB_ITEMS,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height:620px">
        <amex-page-shell
          [portalStyle]="portalStyle"
          [portalTitle]="portalTitle"
          [pageTitle]="pageTitle"
          [pageSubtitle]="pageSubtitle"
          [pageCtaLabel]="pageCtaLabel"
          [showHeader]="showHeader"
          [showFooter]="showFooter"
          [showSidebar]="showSidebar"
          [footerText]="footerText"
          [tabs]="tabs"
          [activeTabId]="activeTabId"
          [subItems]="subItems"
          [activeSubId]="activeSubId"
        >
          <div style="padding:16px;font-family:Arial,sans-serif">
            <div style="background:#fff8e1;border:1px solid #ffe082;border-radius:4px;padding:12px 16px;margin-bottom:16px;font-size:12px;color:#5d4037">
              <strong>Approach 1 — Input Based ✓</strong>
            </div>
            <p style="font-size:13px;color:#333">Cardholder: <strong>JOHN DOE</strong></p>
          </div>
        </amex-page-shell>
      </div>
    `,
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// STORY 2 — CONTENT PROJECTION
// ─────────────────────────────────────────────────────────────────────────────

export const ContentProjection: Story = {
  name: '2 · Content Projection',
  render: () => ({
    template: `<story-content-projection-wrapper></story-content-projection-wrapper>`,
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// STORY 3 — CONFIG DRIVEN
// ─────────────────────────────────────────────────────────────────────────────

export const ConfigDriven: Story = {
  name: '3 · Config Driven',
  args: {
    portalStyle:  'oms',
    pageTitle:    'EDIT YOUR PROFILE',
    pageSubtitle: 'Update your merchant account information',
    showSidebar:  false,
    showHeader:   true,
    showFooter:   true,
    config: {
      header: { visible: true },
      footer: { visible: true, text: '© American Express — OMS' },
    } satisfies AmexPortalLayoutConfig,
    tabs: [
      { id: 'profile',  label: 'EDIT YOUR PROFILE' },
      { id: 'merchant', label: 'MERCHANT ACCOUNTS' },
      { id: 'reports',  label: 'REPORTS' },
    ],
    activeTabId: 'profile',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height:560px">
        <amex-page-shell
          [portalStyle]="portalStyle"
          [pageTitle]="pageTitle"
          [pageSubtitle]="pageSubtitle"
          [showSidebar]="showSidebar"
          [showHeader]="showHeader"
          [showFooter]="showFooter"
          [config]="config"
          [tabs]="tabs"
          [activeTabId]="activeTabId"
        >
          <div style="padding:20px;font-family:Arial,sans-serif">
            <div style="background:#ede7f6;border:1px solid #b39ddb;border-radius:4px;padding:12px 16px;color:#4527a0;font-size:13px">
              <strong>Config-driven rendering ✓</strong><br/><br/>
              Footer text + visibility come from <code>[config]</code>.<br/>
              <code>showHeader</code>/<code>showFooter</code> convenience inputs are
              overridden by <code>config.header.visible</code>/<code>config.footer.visible</code>.
            </div>
          </div>
        </amex-page-shell>
      </div>
    `,
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// STORY 4 — TEMPLATE INJECTION
// ─────────────────────────────────────────────────────────────────────────────

export const TemplateInjection: Story = {
  name: '4 · Template Injection',
  render: () => ({
    template: `<story-template-wrapper></story-template-wrapper>`,
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// STORY 5 — RECOMMENDED COMBINED
// ─────────────────────────────────────────────────────────────────────────────

export const CombinedRecommended: Story = {
  name: '5 · Combined (Recommended)',
  render: () => ({
    template: `<story-combined-wrapper></story-combined-wrapper>`,
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// STORY 6 — ADAPTER INJECTION
// ─────────────────────────────────────────────────────────────────────────────

export const AdapterInjection: Story = {
  name: '6 · Adapter Injection (NEW)',
  parameters: {
    docs: {
      description: {
        story: `
Demonstrates all 6 injection tokens wired up via \`providers\` on a wrapper component.
Each portal provides its own implementation — the shell owns none of this.
Check the browser console when the story loads to see analytics + theme adapter calls.

\`\`\`ts
// In your portal's module/bootstrap:
bootstrapPortal({
  authAdapter:         MyPortalAuthAdapter,
  navAdapter:          MyPortalNavAdapter,
  themeAdapter:        MyPortalThemeAdapter,
  analyticsAdapter:    MyPortalAnalyticsAdapter,
  userContextAdapter:  MyPortalUserContextAdapter,
  featureFlagAdapter:  MyPortalFeatureFlagAdapter,
})
\`\`\`
        `,
      },
    },
  },
  render: () => ({
    template: `<story-adapter-injection-wrapper></story-adapter-injection-wrapper>`,
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// STORY 7 — FEATURE FLAGS
// ─────────────────────────────────────────────────────────────────────────────

export const FeatureFlags: Story = {
  name: '7 · Feature Flags (NEW)',
  parameters: {
    docs: {
      description: {
        story: `
Feature flag resolution priority:

1. **FeatureFlagAdapter** (provided via DI) — takes full control
2. **config.features** map — static flags in layout config
3. **Runtime JSON** \`features\` key — loaded at app startup

Static config example:
\`\`\`ts
config: {
  features: {
    'show-beta-reports': true,
    'enable-wearables':  false,
  }
}
\`\`\`
        `,
      },
    },
  },
  render: () => ({
    template: `<story-feature-flags-wrapper></story-feature-flags-wrapper>`,
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// PORTAL VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

export const PortalONLS: Story = {
  name: 'Portal · ONLS',
  args: {
    portalStyle: 'onls',
    portalTitle: 'ONLS Helper Tool',
    pageTitle:   'PRIORITY PASS™ ENROLLMENT',
    showHeader:  true,
    showFooter:  true,
    showSidebar: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height:500px">
        <amex-page-shell
          [portalStyle]="portalStyle"
          [portalTitle]="portalTitle"
          [pageTitle]="pageTitle"
          [showHeader]="showHeader"
          [showFooter]="showFooter"
          [showSidebar]="showSidebar"
        >
          <div style="padding:16px">ONLS Portal Example</div>
        </amex-page-shell>
      </div>
    `,
  }),
};

export const PortalOMS: Story = {
  name: 'Portal · OMS',
  args: {
    portalStyle: 'oms',
    pageTitle:   'EDIT YOUR PROFILE',
    showHeader:  true,
    showFooter:  true,
    showSidebar: false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height:500px">
        <amex-page-shell
          [portalStyle]="portalStyle"
          [pageTitle]="pageTitle"
          [showHeader]="showHeader"
          [showFooter]="showFooter"
          [showSidebar]="showSidebar"
        >
          <div style="padding:16px">OMS Portal Example</div>
        </amex-page-shell>
      </div>
    `,
  }),
};

export const PortalBCRB: Story = {
  name: 'Portal · BCRB',
  args: {
    portalStyle:  'bcrb',
    portalTitle:  'BCRB Reports',
    showHeader:   true,
    showFooter:   true,
    showSidebar:  true,
    sidebarItems: BCRB_ITEMS,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height:560px">
        <amex-page-shell
          [portalStyle]="portalStyle"
          [portalTitle]="portalTitle"
          [showHeader]="showHeader"
          [showFooter]="showFooter"
          [showSidebar]="showSidebar"
          [sidebarItems]="sidebarItems"
        >
          <div style="padding:16px">BCRB Portal Example</div>
        </amex-page-shell>
      </div>
    `,
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

export const EmbeddedMode: Story = {
  name: 'Layout · Embedded Mode',
  args: {
    portalStyle: 'onls',
    showHeader:  false,
    showFooter:  false,
    showSidebar: false,
    pageTitle:   'EMBEDDED CONTENT PANEL',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height:300px">
        <amex-page-shell
          [portalStyle]="portalStyle"
          [showHeader]="showHeader"
          [showFooter]="showFooter"
          [showSidebar]="showSidebar"
          [pageTitle]="pageTitle"
        >
          <div style="padding:16px;font-family:Arial,sans-serif">
            <div style="background:#fff8e1;border:1px solid #ffe082;border-radius:4px;padding:12px 16px;font-size:12px;color:#5d4037">
              Embedded mode — parent app owns chrome. No header/footer rendered.
            </div>
          </div>
        </amex-page-shell>
      </div>
    `,
  }),
};

export const NoSidebar: Story = {
  name: 'Layout · No Sidebar',
  args: {
    portalStyle:  'oms',
    pageTitle:    'CUSTOMIZED REPORTS',
    pageCtaLabel: 'Request New Report +',
    showHeader:   true,
    showFooter:   true,
    showSidebar:  false,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height:400px">
        <amex-page-shell
          [portalStyle]="portalStyle"
          [pageTitle]="pageTitle"
          [pageCtaLabel]="pageCtaLabel"
          [showHeader]="showHeader"
          [showFooter]="showFooter"
          [showSidebar]="showSidebar"
        >
          <div style="padding:16px;font-family:Arial,sans-serif">
            <div style="background:#e3f2fd;border:1px solid #90caf9;border-radius:4px;padding:12px 16px;font-size:13px;color:#1a237e">
              <code>[showSidebar]="false"</code> — content area expands to full width.
            </div>
          </div>
        </amex-page-shell>
      </div>
    `,
  }),
};