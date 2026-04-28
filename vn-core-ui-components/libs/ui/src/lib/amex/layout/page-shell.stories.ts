import { Component, Input, ViewChild, TemplateRef } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { AmexPageShellComponent } from './page-shell';
import type { AmexPageShellConfig } from './page-shell';

// ─────────────────────────────────────────────────────────────────────────────
// WRAPPER COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
// Storybook Angular CANNOT process:
//   1. ng-content named slots (select="[header]") from inline string templates
//   2. ng-template #ref variables referenced via [headerTemplate]="ref"
//
// The only reliable fix is a real compiled @Component wrapper.
// These wrappers are declared once here and registered via moduleMetadata.
// ─────────────────────────────────────────────────────────────────────────────

// ── Approach 2: Content Projection wrapper ─────────────────────────────────
@Component({
  selector: 'story-approach2-wrapper',
  standalone: true,
  imports: [CommonModule, AmexPageShellComponent],
  template: `
    <div style="height:500px">
      <amex-page-shell portalStyle="onls" [showSidebar]="false">

        <!-- ✅ [header] slot — works because this is a compiled component template -->
        <div header style="
          background:#006fcf;color:#fff;padding:8px 16px;
          display:flex;align-items:center;gap:12px">
          <div style="
            background:#fff;color:#006fcf;font-weight:900;font-size:11px;
            width:36px;height:36px;display:flex;align-items:center;
            justify-content:center;border-radius:3px;line-height:1.1;text-align:center">
            AM<br>EX
          </div>
          <span style="font-size:15px;font-weight:bold">Custom Projected Header</span>
          <button style="
            margin-left:auto;background:#fff;border:none;
            color:#006fcf;font-size:11px;padding:4px 12px;cursor:pointer;border-radius:2px">
            Log Out
          </button>
        </div>

        <!-- Default content slot -->
        <div style="padding:24px;font-family:Arial,sans-serif">
          <div style="background:#e3f2fd;border:1px solid #90caf9;border-radius:3px;padding:12px 16px;font-size:13px;color:#1a237e;margin-bottom:16px">
            <strong>Approach 2 — Content Projection ✓</strong><br>
            The blue header above is rendered via <code>&lt;div header&gt;</code>
            inside a compiled Angular wrapper component.
            The <code>ng-content select="[header]"</code> slot works correctly here.
          </div>
          <p style="font-size:13px;color:#555">Page content goes in the default slot.</p>
        </div>

        <!-- ✅ [footer] slot -->
        <div footer style="
          background:#fff;border-top:1px solid #d8d8d8;padding:8px 16px;
          display:flex;justify-content:center;gap:12px;font-size:11px;color:#888">
          <a href="#" style="color:#006fcf">Privacy Policy</a>
          <span>|</span>
          <a href="#" style="color:#006fcf">Cookie Policy</a>
          <span>|</span>
          <a href="#" style="color:#006fcf">Terms of Service</a>
          <span>|</span>
          <span>© American Express</span>
        </div>

      </amex-page-shell>
    </div>
  `,
})
class Approach2WrapperComponent {}

// ── Approach 4: Template Injection wrapper ─────────────────────────────────
@Component({
  selector: 'story-approach4-wrapper',
  standalone: true,
  imports: [CommonModule, AmexPageShellComponent],
  template: `
    <div style="height:500px">

      <amex-page-shell
        portalStyle="bcrb"
        [headerTemplate]="customBcrbHeader"
        username="ssharaf_onlshelper"
        [showDashboardBar]="true"
        [bureauOptions]="bureauOptions"
        [sidebarItems]="bcrbItems"
        activeSidebarId="corp-monthly">

        <div style="padding:20px;font-family:Arial,sans-serif">
          <strong style="font-size:14px;display:block;margin-bottom:8px">
            Corporate Monthly Audit Report ( REP-010 )
          </strong>
          <div style="background:#e8eaf6;border:1px solid #9fa8da;border-radius:3px;padding:12px 16px;font-size:13px;color:#283593">
            <strong>Approach 4 — Template Injection ✓</strong><br>
            The indigo header above is a real <code>TemplateRef</code> injected
            via <code>[headerTemplate]="customBcrbHeader"</code>.
            Works because the <code>ng-template</code> lives inside
            this compiled wrapper component.
          </div>
        </div>

      </amex-page-shell>

      <!-- ✅ ng-template works because this is a compiled component template -->
      <ng-template #customBcrbHeader>
        <div style="
          background:#3d4dac;display:flex;align-items:center;
          justify-content:space-between;padding:0 16px;height:48px">
          <div style="display:flex;align-items:center;gap:12px">
            <span style="color:#fff;font-size:20px;cursor:pointer">☰</span>
            <span style="color:#fff;font-size:16px;font-weight:bold">
              BCRB Reports — Injected TemplateRef Header
            </span>
          </div>
          <span style="color:#fff;font-size:13px">User :- ssharaf_onlshelper</span>
        </div>
      </ng-template>

    </div>
  `,
})
class Approach4WrapperComponent {
  readonly bureauOptions = [
    { id: 'aecb', label: 'AECB' },
    { id: 'simah', label: 'SIMAH' },
  ];
  readonly bcrbItems = [
    { id: 'consumer-monthly', label: 'Consumer Monthly Audit Report'  },
    { id: 'corp-monthly',     label: 'Corporate Monthly Audit Report' },
    { id: 'consumer-data',    label: 'Consumer Data Audit Report'     },
    { id: 'corp-data',        label: 'Corporate Data Audit Report'    },
    { id: 'consumer-full',    label: 'Consumer Full Report'           },
    { id: 'consumer-history', label: 'Consumer History Report'        },
    { id: 'corp-history',     label: 'Corporate History Report'       },
  ];
}

// ── Approach 5: Combined pattern wrapper (footer slot + inputs) ────────────
@Component({
  selector: 'story-approach5-wrapper',
  standalone: true,
  imports: [CommonModule, AmexPageShellComponent],
  template: `
    <div style="height:560px">
      <amex-page-shell
        portalStyle="onls"
        [config]="pageConfig"
        [tabs]="mainTabs"
        activeTabId="misc"
        [subItems]="subNav"
        activeSubId="priority"
        pageTitle="PRIORITY PASS™ ENROLLMENT"
        pageSubtitle="Manage Priority Pass benefit for cardmembers"
        pageCtaLabel="Enroll Now">

        <!-- ✅ [footer] slot override -->
        <div footer style="
          background:#fff;border-top:1px solid #d8d8d8;padding:8px 16px;
          display:flex;justify-content:center;gap:12px;font-size:11px;color:#888">
          <a href="#" style="color:#006fcf">Privacy Policy</a>
          <span>|</span>
          <a href="#" style="color:#006fcf">Cookie Policy</a>
          <span>|</span>
          <span>© American Express</span>
        </div>

        <!-- Default content -->
        <div style="font-family:Arial,sans-serif">
          <div style="background:#e8f5e9;border:1px solid #c8e6c9;border-radius:3px;padding:12px 16px;margin-bottom:12px;font-size:13px;color:#2e7d32">
            ✓ Priority Pass enrollment is currently active for this cardholder.
          </div>
          <div style="background:#fff8e1;border:1px solid #ffe082;border-radius:3px;padding:10px 14px;font-size:12px;color:#5d4037">
            <strong>Approach 5 — Combined (Recommended) ✓</strong><br>
            Uses <code>[config]</code> object + <code>@Input()</code> tabs/subNav
            + projected <code>[footer]</code> slot all together.
          </div>
        </div>

      </amex-page-shell>
    </div>
  `,
})
class Approach5WrapperComponent {
  readonly pageConfig: AmexPageShellConfig = {
    header: { title: 'ONLS Helper Tool', visible: true },
    footer: { visible: true, text: '© American Express · Privacy Policy' },
  };
  readonly mainTabs = [
    { id: 'statements',  label: 'Statements'        },
    { id: 'misc',        label: 'MISC'               },
    { id: 'centralstmt', label: 'Central Statements' },
  ];
  readonly subNav = [
    { id: 'priority',  label: 'ENROLL FOR PRIORITY PASS™' },
    { id: 'supp',      label: 'Supplementary Access'      },
    { id: 'wallet',    label: 'Digital Wallet'            },
    { id: 'wearables', label: 'Wearables'                 },
  ];
}

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
        Approach2WrapperComponent,
        Approach4WrapperComponent,
        Approach5WrapperComponent,
      ],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# AmexPageShellComponent

Reusable page layout shell for all AEME AMEX portals.

## Portal Styles
| \`portalStyle\` | Portal |
|---|---|
| \`onls\` | ONLS Helper / Hub Login / Supp Access / Lounge / Wearables / Pay-with-Points |
| \`oms\` | Online Merchant Services |
| \`bcrb\` | BCRB Reports portal |

## Customization Approaches
1. **Input-based** — \`@Input()\` properties
2. **Content Projection** — \`[header]\`, \`[footer]\`, default slot *(requires wrapper component in Storybook)*
3. **Config-driven** — \`[config]="pageConfig"\` object
4. **Template Injection** — \`[headerTemplate]="ref"\` *(requires wrapper component in Storybook)*
5. **Combined** — all approaches together
        `,
      },
    },
  },
  // ── Controls panel knobs — covers ALL @Input() properties ─────────────────
  argTypes: {
    portalStyle: {
      control: { type: 'select' },
      options: ['onls', 'oms', 'bcrb'],
      description: 'Portal visual style — drives nav, sidebar, body background',
      table: { category: 'Core' },
    },
    portalTitle: {
      control: 'text',
      description: 'Title in top nav bar',
      table: { category: 'Core' },
    },
    username: {
      control: 'text',
      description: 'BCRB only — shown top-right in indigo bar',
      table: { category: 'Core' },
    },
    omsServiceName: {
      control: 'text',
      description: 'OMS branding subtitle',
      table: { category: 'Core' },
    },
    showHeader: {
      control: 'boolean',
      description: 'Show / hide the header region',
      table: { category: 'Visibility' },
    },
    showFooter: {
      control: 'boolean',
      description: 'Show / hide the footer region',
      table: { category: 'Visibility' },
    },
    showSidebar: {
      control: 'boolean',
      description: 'Show / hide the sidebar',
      table: { category: 'Visibility' },
    },
    showDashboardBar: {
      control: 'boolean',
      description: 'BCRB — show the bureau selector bar',
      table: { category: 'Visibility' },
    },
    footerText: {
      control: 'text',
      description: 'Default footer text',
      table: { category: 'Core' },
    },
    activeTabId: {
      control: 'text',
      description: 'ID of the active tab',
      table: { category: 'Tab Bar' },
    },
    activeSubId: {
      control: 'text',
      description: 'ID of the active sub-nav item',
      table: { category: 'Tab Bar' },
    },
    activeSidebarId: {
      control: 'text',
      description: 'ID of the active sidebar item',
      table: { category: 'Sidebar' },
    },
    pageTitle: {
      control: 'text',
      description: 'Section banner title',
      table: { category: 'Page Header' },
    },
    pageSubtitle: {
      control: 'text',
      description: 'Optional subtitle below page title',
      table: { category: 'Page Header' },
    },
    pageCtaLabel: {
      control: 'text',
      description: 'CTA button label in page header',
      table: { category: 'Page Header' },
    },
    activeBureauId: {
      control: { type: 'select' },
      options: ['aecb', 'simah'],
      description: 'BCRB — selected bureau',
      table: { category: 'BCRB' },
    },
    activeDashboardLinkId: {
      control: 'text',
      description: 'BCRB — active dashboard link id',
      table: { category: 'BCRB' },
    },
    // complex inputs — shown as JSON editors
    tabs:          { control: 'object', table: { category: 'Tab Bar' }  },
    subItems:      { control: 'object', table: { category: 'Tab Bar' }  },
    sidebarItems:  { control: 'object', table: { category: 'Sidebar' }  },
    bureauOptions: { control: 'object', table: { category: 'BCRB' }     },
    dashboardLinks:{ control: 'object', table: { category: 'BCRB' }     },
    config:        { control: 'object', table: { category: 'Approach 3' }},
  },
};

export default meta;
type Story = StoryObj<AmexPageShellComponent>;

// ─────────────────────────────────────────────────────────────────────────────
// APPROACH 1 — Input-Based  ✅ ALL CONTROLS LIVE
// render: (args) => ({ props: args }) is the key — every knob change
// flows through args → props → template binding → DOM update.
// ─────────────────────────────────────────────────────────────────────────────
export const Approach1_InputBased: Story = {
  name: 'Approach 1 · Input-Based (ONLS) — controls live ✓',
  args: {
    portalStyle:   'onls',
    portalTitle:   'ONLS Helper Tool',
    pageTitle:     'PRIORITY PASS™ ENROLLMENT',
    pageSubtitle:  'Manage Priority Pass benefit for cardmembers',
    pageCtaLabel:  'Enroll Now',
    showHeader:    true,
    showFooter:    true,
    showSidebar:   true,
    footerText:    '© American Express. All rights reserved.',
    activeTabId:   'misc',
    activeSubId:   'priority',
    activeSidebarId: '',
    tabs: [
      { id: 'statements',  label: 'Statements'        },
      { id: 'misc',        label: 'MISC'               },
      { id: 'centralstmt', label: 'Central Statements' },
    ],
    subItems: [
      { id: 'priority',  label: 'ENROLL FOR PRIORITY PASS™' },
      { id: 'supp',      label: 'Supplementary Access'      },
      { id: 'wallet',    label: 'Digital Wallet'            },
      { id: 'wearables', label: 'Wearables'                 },
    ],
    sidebarItems: [],
  },
  // ✅ render: (args) — controls knobs are LIVE
  render: (args) => ({
    props: args,
    template: `
      <div style="height:560px">
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
          [sidebarItems]="sidebarItems"
          [activeSidebarId]="activeSidebarId">
          <div style="padding:16px;font-family:Arial,sans-serif">
            <div style="background:#fff8e1;border:1px solid #ffe082;border-radius:3px;padding:10px 14px;font-size:12px;color:#5d4037;margin-bottom:14px">
              <strong>Approach 1 — Input-Based:</strong> use the Controls panel on the right →
              to change portalStyle, pageTitle, showSidebar, showHeader, showFooter live.
            </div>
            <p style="font-size:13px;color:#333">
              Cardholder: <strong>JOHN DOE</strong> &nbsp;|&nbsp;
              Card: <strong>XXXX-XXXX-XXXX-1234</strong>
            </p>
          </div>
        </amex-page-shell>
      </div>
    `,
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// APPROACH 2 — Content Projection  ✅ FIXED via wrapper component
// ─────────────────────────────────────────────────────────────────────────────
export const Approach2_ContentProjection: Story = {
  name: 'Approach 2 · Content Projection — [header] & [footer] slots ✓',
  parameters: {
    docs: {
      description: {
        story: `
Uses \`ng-content select="[header]"\` and \`select="[footer]"\` slots.
**Requires a compiled wrapper \`@Component\`** — Storybook string templates
cannot process Angular attribute-selector content projection.
        `,
      },
    },
  },
  render: () => ({
    template: `<story-approach2-wrapper></story-approach2-wrapper>`,
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// APPROACH 3 — Config-Driven  ✅ ALL CONTROLS LIVE via args
// ─────────────────────────────────────────────────────────────────────────────
export const Approach3_ConfigDriven: Story = {
  name: 'Approach 3 · Config-Driven (OMS) — controls live ✓',
  args: {
    portalStyle:  'oms',
    pageTitle:    'EDIT YOUR PROFILE',
    pageSubtitle: 'Update your merchant account information',
    showSidebar:  false,
    showHeader:   true,
    showFooter:   true,
    config: {
      header: { title: 'Online Merchant Services', visible: true },
      footer: { visible: true, text: '© American Express — Online Merchant Services Portal' },
    },
    tabs: [
      { id: 'profile',  label: 'EDIT YOUR PROFILE' },
      { id: 'merchant', label: 'MERCHANT ACCOUNTS'  },
      { id: 'reports',  label: 'REPORTS'            },
      { id: 'vat',      label: 'VAT INVOICE'        },
    ],
    activeTabId: 'profile',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height:500px">
        <amex-page-shell
          [portalStyle]="portalStyle"
          [pageTitle]="pageTitle"
          [pageSubtitle]="pageSubtitle"
          [showSidebar]="showSidebar"
          [showHeader]="showHeader"
          [showFooter]="showFooter"
          [config]="config"
          [tabs]="tabs"
          [activeTabId]="activeTabId">
          <div style="padding:20px;font-family:Arial,sans-serif">
            <div style="background:#e3f2fd;border:1px solid #90caf9;border-radius:3px;padding:10px 14px;font-size:12px;color:#1a237e;margin-bottom:16px">
              <strong>Approach 3 — Config-Driven:</strong>
              edit the <code>config</code> object in the Controls panel to change
              header title and footer text centrally.
            </div>
            <div style="display:flex;gap:16px">
              <div style="flex:1">
                <div style="font-size:11px;color:#888;text-transform:uppercase;margin-bottom:4px">First Name</div>
                <input readonly value="John" style="width:100%;border:1px solid #ccc;padding:6px 10px;font-size:13px;border-radius:2px" />
              </div>
              <div style="flex:1">
                <div style="font-size:11px;color:#888;text-transform:uppercase;margin-bottom:4px">Last Name</div>
                <input readonly value="Doe" style="width:100%;border:1px solid #ccc;padding:6px 10px;font-size:13px;border-radius:2px" />
              </div>
            </div>
          </div>
        </amex-page-shell>
      </div>
    `,
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// APPROACH 4 — Template Injection  ✅ FIXED via wrapper component
// ─────────────────────────────────────────────────────────────────────────────
export const Approach4_TemplateInjection: Story = {
  name: 'Approach 4 · Template Injection — [headerTemplate] ✓',
  parameters: {
    docs: {
      description: {
        story: `
Passes a \`TemplateRef\` via \`[headerTemplate]="ref"\`.
**Requires a compiled wrapper \`@Component\`** — \`ng-template #ref\` variables
cannot be created or referenced from Storybook string templates.
        `,
      },
    },
  },
  render: () => ({
    template: `<story-approach4-wrapper></story-approach4-wrapper>`,
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// APPROACH 5 — Combined (Recommended)  ✅ FIXED via wrapper component
// ─────────────────────────────────────────────────────────────────────────────
export const Approach5_RecommendedCombined: Story = {
  name: 'Approach 5 · Combined Recommended (ONLS) ✓',
  parameters: {
    docs: {
      description: {
        story: `
Combines \`[config]\` object + \`@Input()\` tabs/subNav + projected \`[footer]\` slot.
The footer projection uses a wrapper component for Storybook compatibility.
        `,
      },
    },
  },
  render: () => ({
    template: `<story-approach5-wrapper></story-approach5-wrapper>`,
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// PORTAL STYLE STORIES — all use args so controls work live
// ─────────────────────────────────────────────────────────────────────────────

export const Portal_ONLS: Story = {
  name: 'Portal · ONLS — Hub Login / Helper Tool',
  args: {
    portalStyle:  'onls',
    portalTitle:  'ONLS Helper Tool',
    pageTitle:    'PRIORITY PASS™ ENROLLMENT',
    showHeader:   true,
    showFooter:   true,
    showSidebar:  true,
    footerText:   '© American Express. All rights reserved.',
    activeTabId:  'misc',
    activeSubId:  'priority',
    tabs: [
      { id: 'statements',  label: 'Statements'        },
      { id: 'misc',        label: 'MISC'               },
      { id: 'centralstmt', label: 'Central Statements' },
    ],
    subItems: [
      { id: 'priority',  label: 'ENROLL FOR PRIORITY PASS™' },
      { id: 'supp',      label: 'Supplementary Access'      },
      { id: 'wallet',    label: 'Digital Wallet'            },
      { id: 'wearables', label: 'Wearables'                 },
    ],
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
          [footerText]="footerText"
          [tabs]="tabs"
          [activeTabId]="activeTabId"
          [subItems]="subItems"
          [activeSubId]="activeSubId">
          <p style="font-family:Arial,sans-serif;font-size:13px;color:#555;padding:16px">
            ONLS portal — hatched sidebar, blue tab bar, blue page header.<br>
            Use the <strong>Controls panel</strong> to toggle showSidebar, showHeader, portalStyle etc.
          </p>
        </amex-page-shell>
      </div>
    `,
  }),
};

export const Portal_OMS: Story = {
  name: 'Portal · OMS — Online Merchant Services',
  args: {
    portalStyle:     'oms',
    pageTitle:       'EDIT YOUR PROFILE',
    pageSubtitle:    'Update your merchant account information',
    showHeader:      true,
    showFooter:      true,
    showSidebar:     true,
    footerText:      '© American Express — Online Merchant Services',
    activeTabId:     'profile',
    activeSidebarId: 'profile',
    tabs: [
      { id: 'profile',  label: 'EDIT YOUR PROFILE' },
      { id: 'merchant', label: 'MERCHANT ACCOUNTS'  },
      { id: 'reports',  label: 'REPORTS'            },
      { id: 'vat',      label: 'VAT INVOICE'        },
      { id: 'admin',    label: 'MRM ADMIN'           },
    ],
    sidebarItems: [
      { id: 'settlement', label: 'Settlement & Submissions' },
      { id: 'profile',    label: 'Edit Profile'            },
      { id: 'merchants',  label: 'Merchant Accounts'       },
      { id: 'contact',    label: 'Contact Information'     },
      { id: 'vat',        label: 'VAT Registration'        },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height:500px">
        <amex-page-shell
          [portalStyle]="portalStyle"
          [pageTitle]="pageTitle"
          [pageSubtitle]="pageSubtitle"
          [showHeader]="showHeader"
          [showFooter]="showFooter"
          [showSidebar]="showSidebar"
          [footerText]="footerText"
          [tabs]="tabs"
          [activeTabId]="activeTabId"
          [sidebarItems]="sidebarItems"
          [activeSidebarId]="activeSidebarId">
          <p style="font-family:Arial,sans-serif;font-size:13px;color:#555;padding:16px">
            OMS portal — LOG OUT top-right, AMERICAN EXPRESS branding, gray tab bar, sidebar menu.
          </p>
        </amex-page-shell>
      </div>
    `,
  }),
};

export const Portal_BCRB: Story = {
  name: 'Portal · BCRB — Reports Portal',
  args: {
    portalStyle:          'bcrb',
    portalTitle:          'BCRB Reports',
    username:             'ssharaf_onlshelper',
    showDashboardBar:     true,
    showHeader:           true,
    showFooter:           true,
    showSidebar:          true,
    footerText:           '© American Express — BCRB Reporting',
    activeBureauId:       'aecb',
    activeDashboardLinkId:'bcrb',
    activeSidebarId:      'corp-monthly',
    bureauOptions: [
      { id: 'aecb',  label: 'AECB'  },
      { id: 'simah', label: 'SIMAH' },
    ],
    dashboardLinks: [
      { id: 'bcrb',       label: 'BCRB Reports' },
      { id: 'aecb-alert', label: 'AECB Alert'   },
      { id: 'aecb-scrub', label: 'AECB Scrub'   },
    ],
    sidebarItems: [
      { id: 'consumer-monthly', label: 'Consumer Monthly Audit Report'  },
      { id: 'corp-monthly',     label: 'Corporate Monthly Audit Report' },
      { id: 'consumer-data',    label: 'Consumer Data Audit Report'     },
      { id: 'corp-data',        label: 'Corporate Data Audit Report'    },
      { id: 'consumer-full',    label: 'Consumer Full Report'           },
      { id: 'consumer-history', label: 'Consumer History Report'        },
      { id: 'corp-history',     label: 'Corporate History Report'       },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="height:500px">
        <amex-page-shell
          [portalStyle]="portalStyle"
          [portalTitle]="portalTitle"
          [username]="username"
          [showDashboardBar]="showDashboardBar"
          [showHeader]="showHeader"
          [showFooter]="showFooter"
          [showSidebar]="showSidebar"
          [footerText]="footerText"
          [bureauOptions]="bureauOptions"
          [activeBureauId]="activeBureauId"
          [dashboardLinks]="dashboardLinks"
          [activeDashboardLinkId]="activeDashboardLinkId"
          [sidebarItems]="sidebarItems"
          [activeSidebarId]="activeSidebarId">
          <div style="font-family:Arial,sans-serif;padding:16px">
            <strong style="font-size:14px;display:block;margin-bottom:8px">
              Corporate Monthly Audit Report ( REP-010 )
            </strong>
            <p style="font-size:13px;color:#555">
              BCRB portal — indigo hamburger bar, bureau dropdown, white sidebar with report list.<br>
              Use Controls panel: change <strong>activeBureauId</strong>, <strong>activeSidebarId</strong>, toggle <strong>showDashboardBar</strong>.
            </p>
          </div>
        </amex-page-shell>
      </div>
    `,
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// LAYOUT VARIANTS — controls live
// ─────────────────────────────────────────────────────────────────────────────

export const NoHeaderNoFooter: Story = {
  name: 'Layout · No Header / No Footer — Embedded Mode',
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
          [pageTitle]="pageTitle">
          <p style="font-family:Arial,sans-serif;font-size:13px;color:#555;padding:16px">
            Embedded mode — use Controls to toggle showHeader / showFooter / showSidebar.
          </p>
        </amex-page-shell>
      </div>
    `,
  }),
};

export const NoSidebar: Story = {
  name: 'Layout · No Sidebar — Full-Width Content',
  args: {
    portalStyle:  'oms',
    pageTitle:    'CUSTOMIZED REPORTS',
    pageCtaLabel: 'Request New Report +',
    showHeader:   true,
    showFooter:   true,
    showSidebar:  false,
    footerText:   '© American Express',
    activeTabId:  'reports',
    tabs: [
      { id: 'profile',  label: 'EDIT YOUR PROFILE' },
      { id: 'merchant', label: 'MERCHANT ACCOUNTS'  },
      { id: 'reports',  label: 'REPORTS'            },
    ],
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
          [footerText]="footerText"
          [tabs]="tabs"
          [activeTabId]="activeTabId">
          <p style="font-family:Arial,sans-serif;font-size:13px;color:#555;padding:16px">
            No sidebar — content is full width. Toggle <strong>showSidebar</strong> in Controls to compare.
          </p>
        </amex-page-shell>
      </div>
    `,
  }),
};