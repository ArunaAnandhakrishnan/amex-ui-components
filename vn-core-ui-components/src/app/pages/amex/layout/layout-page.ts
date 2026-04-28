import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowcasePageComponent } from '../../showcase-page';
import { VariantSectionComponent } from '../../variant-section';
import { AmexPageShellComponent } from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-amex-layout-page',
  standalone: true,
  imports: [
    CommonModule,
    ShowcasePageComponent,
    VariantSectionComponent,
    AmexPageShellComponent,
  ],
  template: `
    <app-showcase-page
      title="AMEX Layout · Page Shell"
      description="Configurable page layout shell supporting all 3 AMEX portal styles (onls, oms, bcrb) and all 4 customization approaches from the PDF spec: Input-based, Content Projection, Config-driven, and Template Injection."
    >

      <!-- ── 1. ONLS Full Shell (Recommended Combined) ── -->
      <app-variant-section title="1 · ONLS — Full Shell (Recommended Pattern)">
        <div class="shell-demo-wrap">
          <amex-page-shell
            portalStyle="onls"
            portalTitle="ONLS Helper Tool"
            [tabs]="onlsTabs"
            activeTabId="misc"
            [subItems]="prioritySubNav"
            activeSubId="priority"
            pageTitle="PRIORITY PASS™ ENROLLMENT"
            pageSubtitle="Manage Priority Pass benefit for cardmembers"
            pageCtaLabel="Enroll Now"
            footerText="© American Express. All rights reserved."
            (logout)="onLogout('ONLS')"
            (tabClick)="onTabClick($event)"
            (pageCtaClick)="onCtaClick()">
            <div class="demo-content">
              <div class="demo-info-box">
                ✓ This is the <strong>recommended combined approach</strong>:
                <code>[tabs]</code>, <code>pageTitle</code>, and content projection all
                work together. The ONLS hatched sidebar is automatic.
              </div>
              <table class="demo-table">
                <thead>
                  <tr>
                    <th>Card Number</th>
                    <th>Card Type</th>
                    <th>Priority Pass Status</th>
                    <th>Enrolled Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>XXXX-XXXX-XXXX-1234</td>
                    <td>Gold</td>
                    <td><span class="badge badge--active">Active</span></td>
                    <td>15 Jan 2024</td>
                  </tr>
                  <tr>
                    <td>XXXX-XXXX-XXXX-5678</td>
                    <td>Platinum</td>
                    <td><span class="badge badge--pending">Pending</span></td>
                    <td>—</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </amex-page-shell>
        </div>
      </app-variant-section>

      <!-- ── 2. OMS Portal Shell ── -->
      <app-variant-section title="2 · OMS — Online Merchant Services Shell">
        <div class="shell-demo-wrap">
          <amex-page-shell
            portalStyle="oms"
            [tabs]="omsTabs"
            activeTabId="profile"
            [sidebarItems]="omsSidebar"
            activeSidebarId="profile"
            pageTitle="EDIT YOUR PROFILE"
            pageSubtitle="Update your merchant account details"
            [config]="omsConfig"
            (logout)="onLogout('OMS')"
            (tabClick)="onTabClick($event)"
            (sidebarItemClick)="onSidebarClick($event)">
            <div class="demo-content">
              <div class="demo-info-box demo-info-box--blue">
                OMS portal — <strong>config-driven approach</strong> sets
                footer text via <code>[config]="omsConfig"</code>.
                Sidebar + tab bar are driven by <code>@Input()</code> arrays.
              </div>
              <div class="demo-form-row">
                <div class="demo-form-field">
                  <label>First Name</label>
                  <input type="text" value="John" readonly />
                </div>
                <div class="demo-form-field">
                  <label>Last Name</label>
                  <input type="text" value="Doe" readonly />
                </div>
              </div>
              <div class="demo-form-row">
                <div class="demo-form-field">
                  <label>Email</label>
                  <input type="text" value="john.doe@example.com" readonly />
                </div>
              </div>
            </div>
          </amex-page-shell>
        </div>
      </app-variant-section>

      <!-- ── 3. BCRB Portal Shell ── -->
      <app-variant-section title="3 · BCRB — Reports Portal Shell">
        <div class="shell-demo-wrap">
          <amex-page-shell
            portalStyle="bcrb"
            portalTitle="BCRB Reports"
            username="ssharaf_onlshelper"
            [showDashboardBar]="true"
            [bureauOptions]="bureauOptions"
            [dashboardLinks]="dashboardLinks"
            activeDashboardLinkId="bcrb"
            [sidebarItems]="bcrbSidebar"
            activeSidebarId="corp-monthly"
            footerText="© American Express — BCRB Reporting"
            (logout)="onLogout('BCRB')"
            (menuToggle)="onMenuToggle()"
            (bureauChange)="onBureauChange($event)"
            (sidebarItemClick)="onSidebarClick($event)">
            <div class="demo-content">
              <strong style="font-size:14px;display:block;margin-bottom:8px">
                Corporate Monthly Audit Report ( REP-010 )
              </strong>
              <div class="demo-info-box">
                BCRB portal — indigo hamburger bar, bureau dropdown,
                white sidebar with report list. All shell chrome is automatic
                from <code>portalStyle="bcrb"</code>.
              </div>
            </div>
          </amex-page-shell>
        </div>
      </app-variant-section>

      <!-- ── 4. No Sidebar (full-width) ── -->
      <app-variant-section title="4 · No Sidebar — Full-Width Content">
        <div class="shell-demo-wrap">
          <amex-page-shell
            portalStyle="oms"
            [tabs]="omsTabs"
            activeTabId="reports"
            [showSidebar]="false"
            pageTitle="CUSTOMIZED REPORTS"
            pageCtaLabel="Request New Report +"
            footerText="© American Express">
            <div class="demo-content">
              <div class="demo-info-box demo-info-box--blue">
                <code>[showSidebar]="false"</code> — content column stretches
                to 100% width. Useful for full-width report views.
              </div>
            </div>
          </amex-page-shell>
        </div>
      </app-variant-section>

      <!-- ── 5. Content Projection — custom header/footer slots ── -->
      <app-variant-section title="5 · Content Projection — [header] and [footer] Slots">
        <div class="shell-demo-wrap">
          <amex-page-shell portalStyle="onls" [showSidebar]="false">

            <!-- Consumer provides their own header via [header] attribute -->
            <div header class="custom-header-slot">
              <div class="custom-header-logo">AM<br>EX</div>
              <span class="custom-header-title">Custom Projected Header</span>
              <button class="custom-header-logout">Log Out</button>
            </div>

            <!-- Default content -->
            <div class="demo-content">
              <div class="demo-info-box">
                <strong>Content Projection (Approach 2):</strong>
                The blue header above was injected via
                <code>&lt;div header&gt;...&lt;/div&gt;</code> — the consumer
                owns the entire header chrome. The default AmexTopNavBar is
                suppressed automatically when a <code>[header]</code> slot is present.
              </div>
            </div>

            <!-- Consumer provides their own footer via [footer] attribute -->
            <div footer class="custom-footer-slot">
              <a href="#">Privacy Policy</a>
              <span>|</span>
              <a href="#">Cookie Policy</a>
              <span>|</span>
              <a href="#">Terms of Service</a>
              <span>|</span>
              <span>© American Express</span>
            </div>

          </amex-page-shell>
        </div>
      </app-variant-section>

      <!-- ── 6. No Header / No Footer (embedded) ── -->
      <app-variant-section title="6 · No Header / No Footer — Embedded Mode">
        <div class="shell-demo-wrap" style="height:200px">
          <amex-page-shell
            portalStyle="onls"
            [showHeader]="false"
            [showFooter]="false"
            [showSidebar]="false"
            pageTitle="EMBEDDED CONTENT PANEL">
            <div class="demo-content">
              <div class="demo-info-box">
                <code>[showHeader]="false"</code> + <code>[showFooter]="false"</code> —
                useful when embedding the shell inside a parent layout that
                already provides the top chrome.
              </div>
            </div>
          </amex-page-shell>
        </div>
      </app-variant-section>

    </app-showcase-page>
  `,
  styles: [`
    .shell-demo-wrap {
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      overflow: hidden;
      height: 420px;
      display: flex;
      flex-direction: column;
    }

    /* Demo content inside shell */
    .demo-content {
      padding: 16px;
      font-family: Arial, sans-serif;
      font-size: 13px;
      color: #333;
    }

    .demo-info-box {
      background: #fff8e1;
      border: 1px solid #ffe082;
      border-radius: 3px;
      padding: 10px 14px;
      margin-bottom: 14px;
      font-size: 12px;
      color: #5d4037;
      line-height: 1.5;
    }

    .demo-info-box--blue {
      background: #e3f2fd;
      border-color: #90caf9;
      color: #1a237e;
    }

    .demo-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    }
    .demo-table th {
      background: #f5f5f5;
      padding: 6px 10px;
      text-align: left;
      color: #333;
      border-bottom: 1px solid #ddd;
      font-weight: bold;
    }
    .demo-table td {
      padding: 6px 10px;
      color: #555;
      border-bottom: 1px solid #eee;
    }

    .badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 11px;
      font-weight: bold;
    }
    .badge--active { background: #e8f5e9; color: #2e7d32; }
    .badge--pending { background: #fff3e0; color: #e65100; }

    .demo-form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 12px;
    }
    .demo-form-field {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }
    .demo-form-field label {
      font-size: 11px;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .demo-form-field input {
      border: 1px solid #ccc;
      padding: 6px 10px;
      font-size: 13px;
      font-family: Arial, sans-serif;
      border-radius: 2px;
      background: #fafafa;
    }

    /* Custom projected header slot */
    .custom-header-slot {
      background: #006fcf;
      display: flex;
      align-items: center;
      padding: 8px 12px;
      gap: 10px;
    }
    .custom-header-logo {
      background: #fff;
      color: #006fcf;
      font-weight: 900;
      font-size: 11px;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      line-height: 1.1;
      text-align: center;
    }
    .custom-header-title {
      color: #fff;
      font-size: 16px;
      font-weight: bold;
    }
    .custom-header-logout {
      margin-left: auto;
      background: #fff;
      border: none;
      color: #006fcf;
      font-size: 11px;
      padding: 3px 10px;
      cursor: pointer;
      border-radius: 1px;
    }

    /* Custom projected footer slot */
    .custom-footer-slot {
      background: #fff;
      border-top: 1px solid #d8d8d8;
      padding: 8px 16px;
      display: flex;
      justify-content: center;
      gap: 10px;
      font-size: 11px;
      color: #888;
    }
    .custom-footer-slot a {
      color: #006fcf;
      text-decoration: none;
    }
    .custom-footer-slot a:hover { text-decoration: underline; }
  `],
})
export class AmexLayoutPageComponent {

  // ── ONLS tabs ─────────────────────────────────────────────────────────────
  onlsTabs = [
    { id: 'statements',  label: 'Statements' },
    { id: 'misc',        label: 'MISC' },
    { id: 'centralstmt', label: 'Central Statements' },
  ];

  prioritySubNav = [
    { id: 'priority',  label: 'ENROLL FOR PRIORITY PASS™' },
    { id: 'supp',      label: 'Supplementary Access' },
    { id: 'wallet',    label: 'Digital Wallet' },
    { id: 'wearables', label: 'Wearables' },
  ];

  // ── OMS tabs + sidebar ────────────────────────────────────────────────────
  omsTabs = [
    { id: 'profile',  label: 'EDIT YOUR PROFILE' },
    { id: 'merchant', label: 'MERCHANT ACCOUNTS' },
    { id: 'reports',  label: 'REPORTS' },
    { id: 'vat',      label: 'VAT INVOICE' },
    { id: 'admin',    label: 'MRM ADMIN' },
  ];

  omsSidebar = [
    { id: 'settlement', label: 'Settlement & Submissions' },
    { id: 'profile',    label: 'Edit Profile' },
    { id: 'merchants',  label: 'Merchant Accounts' },
    { id: 'contact',    label: 'Contact Information' },
    { id: 'vat',        label: 'VAT Registration' },
  ];

  // Approach 3: config object
  omsConfig = {
    header: { title: 'Online Merchant Services', visible: true },
    footer: { visible: true, text: '© American Express — Online Merchant Services Portal' },
  };

  // ── BCRB sidebar + menu ───────────────────────────────────────────────────
  bcrbSidebar = [
    { id: 'consumer-monthly', label: 'Consumer Monthly Audit Report' },
    { id: 'corp-monthly',     label: 'Corporate Monthly Audit Report' },
    { id: 'consumer-data',    label: 'Consumer Data Audit Report' },
    { id: 'corp-data',        label: 'Corporate Data Audit Report' },
    { id: 'consumer-full',    label: 'Consumer Full Report' },
    { id: 'consumer-history', label: 'Consumer History Report' },
    { id: 'corp-history',     label: 'Corporate History Report' },
  ];

  bureauOptions = [
    { id: 'aecb',  label: 'AECB'  },
    { id: 'simah', label: 'SIMAH' },
  ];

  dashboardLinks = [
    { id: 'bcrb',       label: 'BCRB Reports' },
    { id: 'aecb-alert', label: 'AECB Alert'   },
    { id: 'aecb-scrub', label: 'AECB Scrub'   },
  ];

  // ── Event handlers ────────────────────────────────────────────────────────
  onLogout(portal: string) {
    console.log(`[PageShell] logout clicked — portal: ${portal}`);
  }
  onTabClick(tabId: string) {
    console.log(`[PageShell] tab clicked: ${tabId}`);
  }
  onSidebarClick(itemId: string) {
    console.log(`[PageShell] sidebar item clicked: ${itemId}`);
  }
  onCtaClick() {
    console.log(`[PageShell] page CTA clicked`);
  }
  onMenuToggle() {
    console.log(`[PageShell] hamburger menu toggled`);
  }
  onBureauChange(bureauId: string) {
    console.log(`[PageShell] bureau changed: ${bureauId}`);
  }
}
