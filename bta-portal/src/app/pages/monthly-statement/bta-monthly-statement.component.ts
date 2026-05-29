import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmexPageHeaderComponent, AmexBreadcrumbTrailComponent } from '@vn-core-ui-components/ui';

@Component({
    selector: 'app-bta-monthly-statement',
    imports: [CommonModule, FormsModule, AmexPageHeaderComponent, AmexBreadcrumbTrailComponent],
    template: `
    <amex-page-header portalStyle="onls" title="BTA MONTHLY STATEMENT"></amex-page-header>
    <amex-breadcrumb-trail
      [items]="[{id:'home',label:'Home'},{id:'bta',label:'BTA Portal'},{id:'ms',label:'Monthly Statements'}]"
      [showBack]="true" (backClick)="showStatement=false">
    </amex-breadcrumb-trail>

    <div class="bta-page">

      <!-- Account selection -->
      <div *ngIf="!showStatement" class="bta-panel">
        <div class="bta-panel-hd">Monthly Statements</div>
        <div class="bta-panel-bd">
          <div class="bta-field-row">
            <label>Select the BTA Number you wish to Access Monthly Statement for:</label>
          </div>
          <div class="bta-field-row" style="margin-top:8px;">
            <select [(ngModel)]="selectedAccount" class="bta-select-wide">
              <option *ngFor="let a of accounts" [value]="a.value">{{ a.label }}</option>
            </select>
            <button class="bta-btn bta-btn-primary" (click)="showStatement=true">View Statement</button>
          </div>
        </div>
      </div>

      <!-- Monthly Statement — matches document image16 exactly -->
      <div *ngIf="showStatement" class="bta-panel">
        <div class="bta-panel-hd">BTA Monthly Statement</div>
        <div class="bta-panel-bd">
          <div class="stmt-date">{{ today }}</div>
          <div class="stmt-title">BTA Monthly Statement</div>
          <div class="stmt-account">BTA 3744XXXXXXX5229 - BTACLIENTBAH001</div>
          <div class="stmt-agent">Travel Agent: DNATA (BTA) - Telephone: +97143166343</div>

          <!-- Summary table -->
          <table class="summary-table">
            <thead>
              <tr>
                <th>Previous Balance</th><th>New Remittance</th><th>New Credit</th>
                <th>New Debits</th><th>Disputes*</th><th>Total Due Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="amount">{{ summary.prevBalance | number:'1.3-3' }}</td>
                <td class="amount">{{ summary.remittance | number:'1.3-3' }}</td>
                <td class="amount">{{ summary.credit | number:'1.3-3' }}</td>
                <td class="amount">{{ summary.debits | number:'1.3-3' }}</td>
                <td class="amount">{{ summary.disputes | number:'1.3-3' }}</td>
                <td class="amount total">{{ summary.totalDue | number:'1.3-3' }}</td>
              </tr>
              <tr>
                <td colspan="5"></td>
                <td class="due-date">Total Balance Due by {{ dueDate }}</td>
              </tr>
            </tbody>
          </table>

          <div class="stmt-empty">There are no transactions available.</div>

          <div class="stmt-legend">1 Remittance - 2 Refund - 3 Dispute</div>
          <div class="stmt-note">*by the time of statement issuance no settlement was received</div>

          <div class="stmt-footer">
            <div class="view-diff">
              <label>View a Different Monthly Statement:</label>
              <select [(ngModel)]="selectedMonth" class="bta-select-md">
                <option *ngFor="let m of months" [value]="m">{{ m }}</option>
              </select>
              <button class="bta-btn bta-btn-secondary" (click)="showDiffStatement()">Show Statement</button>
            </div>
            <div class="download-row">
              <select class="bta-select-sm" [(ngModel)]="downloadFormat">
                <option>PDF</option><option>Excel</option><option>CSV</option><option>RTF</option>
              </select>
              <button class="bta-btn bta-btn-primary" (click)="download()">Download Report</button>
            </div>
          </div>
          <div style="margin-top:8px;">
            <button class="bta-btn bta-btn-secondary" (click)="showStatement=false">Return to Account Selection</button>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .bta-page        { padding:0 16px 24px; background:#fff; }
    .bta-panel       { border:1px solid #b8d0e8; border-radius:2px; overflow:hidden; margin-top:12px; }
    .bta-panel-hd    { background:#cfe2f3; border-bottom:1px solid #b8d0e8; padding:8px 14px; font-size:13px; font-weight:bold; color:#1e3a6e; }
    .bta-panel-bd    { padding:16px; }
    .bta-field-row   { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
    .bta-field-row label { font-size:12px; color:#333; }
    .bta-select-wide { padding:4px 8px; font-size:12px; border:1px solid #aaa; min-width:300px; font-family:Arial,sans-serif; }
    .bta-select-md   { padding:3px 6px; font-size:12px; border:1px solid #aaa; font-family:Arial,sans-serif; min-width:160px; }
    .bta-select-sm   { padding:3px 6px; font-size:12px; border:1px solid #aaa; font-family:Arial,sans-serif; }
    .bta-btn         { padding:4px 14px; font-size:12px; font-family:Arial,sans-serif; cursor:pointer; border-radius:2px; }
    .bta-btn-primary  { background:#1e3a6e; color:#fff; border:1px solid #1e3a6e; }
    .bta-btn-primary:hover { background:#2d5499; }
    .bta-btn-secondary { background:#fff; color:#333; border:1px solid #aaa; }
    .stmt-date       { text-align:right; font-size:12px; margin-bottom:12px; }
    .stmt-title      { text-align:center; font-size:14px; font-weight:bold; margin-bottom:6px; }
    .stmt-account    { text-align:center; color:#1e3a6e; font-size:13px; }
    .stmt-agent      { text-align:center; font-size:12px; color:#555; margin-bottom:14px; }
    .summary-table   { width:100%; border-collapse:collapse; font-size:12px; margin-bottom:14px; }
    .summary-table th { background:#cfe2f3; border:1px solid #b8d0e8; padding:7px 12px; text-align:center; font-weight:bold; color:#1e3a6e; }
    .summary-table td { border:1px solid #dde4ed; padding:7px 12px; text-align:center; }
    .amount          { font-family:monospace; }
    .total           { font-weight:bold; }
    .due-date        { font-size:11px; color:#555; text-align:right; border:none !important; }
    .stmt-empty      { color:#cc0000; font-size:12px; padding:10px 0; }
    .stmt-legend     { font-size:11px; color:#006fcf; }
    .stmt-note       { font-size:11px; color:#555; margin:4px 0 14px; }
    .stmt-footer     { display:flex; justify-content:space-between; align-items:center; border-top:1px solid #eee; padding-top:10px; flex-wrap:wrap; gap:10px; }
    .view-diff       { display:flex; align-items:center; gap:8px; font-size:12px; flex-wrap:wrap; }
    .download-row    { display:flex; gap:8px; align-items:center; }
  `]
})
export class BtaMonthlyStatementComponent {
  showStatement = false;
  downloadFormat = 'PDF';
  selectedMonth = 'February 2025';
  today = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'long', year:'numeric' });
  dueDate = '25-03-2025';

  selectedAccount = 'BTACLIENTBAH001-3744XXXXXXX5229';
  accounts = [
    { value:'BTACLIENTBAH001-3744XXXXXXX5229', label:'BTACLIENTBAH001-3744XXXXXXX5229' },
    { value:'BTACLIENTBAH002-3744XXXXXXX6130', label:'BTACLIENTBAH002-3744XXXXXXX6130' },
  ];

  months = ['February 2025','January 2025','December 2024','November 2024','October 2024'];

  summary = { prevBalance:-57.852, remittance:0, credit:0, debits:0, disputes:0, totalDue:-57.852 };

  showDiffStatement() {}
  download() { alert(`Downloading ${this.selectedMonth} in ${this.downloadFormat} format`); }
}
