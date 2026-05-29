import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AmexPageHeaderComponent,
  AmexBreadcrumbTrailComponent,
  AmexStatementRowComponent,
  AmexAccountNumberComponent,
} from '@vn-core-ui-components/ui';

@Component({
    selector: 'app-bta-memo-statement',
    imports: [
        CommonModule, FormsModule,
        AmexPageHeaderComponent,
        AmexBreadcrumbTrailComponent,
    ],
    template: `
    <amex-page-header portalStyle="onls" title="BTA MEMO STATEMENT"></amex-page-header>
    <amex-breadcrumb-trail
      [items]="[{id:'home',label:'Home'},{id:'bta',label:'BTA Portal'},{id:'memo',label:'Memo Statement'}]"
      [showBack]="true" (backClick)="goBack()">
    </amex-breadcrumb-trail>

    <div class="bta-page">

      <!-- Account selection -->
      <div *ngIf="!showStatement" class="bta-panel">
        <div class="bta-panel-hd">Memo Statement</div>
        <div class="bta-panel-bd">
          <div class="bta-field-row">
            <label>Select BTA Number:</label>
            <select [(ngModel)]="selectedAccount" class="bta-select-wide">
              <option *ngFor="let a of accounts" [value]="a.value">{{ a.label }}</option>
            </select>
            <button class="bta-btn bta-btn-primary" (click)="viewStatement()">View Statement</button>
          </div>
        </div>
      </div>

      <!-- Statement view — matches document image13 exactly -->
      <div *ngIf="showStatement" class="bta-panel">
        <div class="bta-panel-hd">BTA Memo Statement</div>
        <div class="bta-panel-bd">
          <div class="stmt-date">{{ today }}</div>
          <div class="stmt-title">BTA Memo Statement</div>
          <div class="stmt-account">BTA 3744XXXXXXX5229 - BTACLIENTBAH001</div>
          <div class="stmt-agent">Travel Agent: DNATA (BTA) - Telephone: +97143166343</div>

          <div class="stmt-empty" *ngIf="transactions.length === 0">
            There are no transactions available.
          </div>

          <table *ngIf="transactions.length > 0" class="bta-table">
            <thead>
              <tr><th>Date</th><th>Description</th><th>Reference</th><th>Type</th><th>Amount</th></tr>
            </thead>
            <tbody>
              <tr *ngFor="let t of transactions">
                <td>{{ t.date }}</td><td>{{ t.desc }}</td>
                <td>{{ t.ref }}</td><td>{{ t.type }}</td>
                <td class="amount">{{ t.amount | number:'1.3-3' }}</td>
              </tr>
            </tbody>
          </table>

          <div class="stmt-legend">
            <span class="legend-link">1 Remittance - 2 Refund - 3 Dispute - 5 Allocated - 6 Allocated &amp; Paid</span>
          </div>
          <p class="stmt-note">Should you have any enquiry regarding the transactions and information displayed, kindly contact your Travel Agent or AEME BTA Team on ((+973) 17 557243).</p>

          <div class="stmt-footer">
            <button class="bta-btn bta-btn-secondary" (click)="showStatement=false">Return to Account Selection</button>
            <div class="download-row">
              <select class="bta-select-sm" [(ngModel)]="downloadFormat">
                <option>PDF</option><option>Excel</option><option>CSV</option><option>RTF</option>
              </select>
              <button class="bta-btn bta-btn-primary" (click)="download()">Download Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .bta-page       { padding:0 16px 24px; background:#fff; }
    .bta-panel      { border:1px solid #b8d0e8; border-radius:2px; overflow:hidden; margin-top:12px; }
    .bta-panel-hd   { background:#cfe2f3; border-bottom:1px solid #b8d0e8; padding:8px 14px; font-size:13px; font-weight:bold; color:#1e3a6e; }
    .bta-panel-bd   { padding:16px; }
    .bta-field-row  { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
    .bta-field-row label { font-size:12px; font-weight:bold; color:#333; white-space:nowrap; }
    .bta-select-wide { padding:4px 8px; font-size:12px; border:1px solid #aaa; min-width:280px; font-family:Arial,sans-serif; }
    .bta-select-sm  { padding:3px 6px; font-size:12px; border:1px solid #aaa; font-family:Arial,sans-serif; }
    .bta-btn        { padding:4px 14px; font-size:12px; font-family:Arial,sans-serif; cursor:pointer; border-radius:2px; }
    .bta-btn-primary { background:#1e3a6e; color:#fff; border:1px solid #1e3a6e; }
    .bta-btn-primary:hover { background:#2d5499; }
    .bta-btn-secondary { background:#fff; color:#333; border:1px solid #aaa; }
    .stmt-date      { text-align:right; font-size:12px; margin-bottom:12px; }
    .stmt-title     { text-align:center; font-size:14px; font-weight:bold; margin-bottom:6px; }
    .stmt-account   { text-align:center; color:#006fcf; font-size:13px; }
    .stmt-agent     { text-align:center; font-size:12px; color:#555; margin-bottom:16px; }
    .stmt-empty     { color:#cc0000; font-size:12px; padding:12px 0; }
    .bta-table      { width:100%; border-collapse:collapse; font-size:12px; margin-bottom:14px; }
    .bta-table th   { background:#cfe2f3; border:1px solid #b8d0e8; padding:6px 10px; text-align:left; font-weight:bold; color:#1e3a6e; }
    .bta-table td   { border:1px solid #dde4ed; padding:6px 10px; }
    .amount         { text-align:right; font-family:monospace; }
    .legend-link    { color:#006fcf; font-size:11px; }
    .stmt-note      { font-size:11px; color:#555; margin:8px 0; }
    .stmt-footer    { display:flex; justify-content:space-between; align-items:center; margin-top:14px; border-top:1px solid #eee; padding-top:12px; }
    .download-row   { display:flex; gap:8px; align-items:center; }
  `]
})
export class BtaMemoStatementComponent {
  showStatement = false;
  downloadFormat = 'PDF';
  today = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });

  selectedAccount = 'BTACLIENTBAH001-3744XXXXXXX5229';
  accounts = [
    { value:'BTACLIENTBAH001-3744XXXXXXX5229', label:'BTACLIENTBAH001-3744XXXXXXX5229' },
    { value:'BTACLIENTBAH002-3744XXXXXXX6130', label:'BTACLIENTBAH002-3744XXXXXXX6130' },
  ];

  transactions: any[] = [];  // Empty — matches document "no transactions available"

  viewStatement() { this.showStatement = true; }
  download() { alert(`Downloading in ${this.downloadFormat} format`); }
  goBack() { this.showStatement = false; }
}
