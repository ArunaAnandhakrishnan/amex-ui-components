import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmexPageHeaderComponent, AmexBreadcrumbTrailComponent } from '@vn-core-ui-components/ui';

interface Transaction {
  date: string; description: string; amount: number;
  reference: string; status: string; allocated: boolean;
}

@Component({
    selector: 'app-bta-payment-allocation',
    imports: [CommonModule, FormsModule, AmexPageHeaderComponent, AmexBreadcrumbTrailComponent],
    template: `
    <amex-page-header portalStyle="onls" title="PAYMENT ALLOCATION"></amex-page-header>
    <amex-breadcrumb-trail
      [items]="[{id:'home',label:'Home'},{id:'bta',label:'BTA Portal'},{id:'pa',label:'Payment Allocation'}]"
      [showBack]="true" (backClick)="view=''">
    </amex-breadcrumb-trail>

    <div class="bta-page">

      <!-- Account selector — matches document image17 -->
      <div class="bta-panel">
        <div class="bta-panel-hd">Payment Allocation</div>
        <div class="bta-panel-bd">
          <div class="bta-field-row">
            <div>
              <div class="field-label">Select the BTA Number you wish to Access</div>
              <div class="field-label">Payment Allocation for:</div>
            </div>
            <select [(ngModel)]="selectedAccount" class="bta-select-wide">
              <option *ngFor="let a of accounts" [value]="a.value">{{ a.label }}</option>
            </select>
          </div>
          <div class="btn-row" style="margin-top:12px;">
            <button class="bta-btn bta-btn-secondary" (click)="view='unbilled'">Open Unbilled Transaction List</button>
            <button class="bta-btn bta-btn-secondary" (click)="view='billed'">Open Billed Transaction List</button>
          </div>
        </div>
      </div>

      <!-- Transaction list -->
      <div *ngIf="view" class="bta-panel" style="margin-top:12px;">
        <div class="bta-panel-hd">{{ view === 'unbilled' ? 'Unbilled' : 'Billed' }} Transactions — {{ selectedAccount }}</div>
        <div class="bta-panel-bd">
          <table class="bta-table" *ngIf="currentTransactions.length">
            <thead>
              <tr>
                <th>Date</th><th>Description</th><th>Reference</th>
                <th>Amount (BHD)</th><th>Status</th><th>Allocate</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let t of currentTransactions">
                <td>{{ t.date }}</td>
                <td>{{ t.description }}</td>
                <td>{{ t.reference }}</td>
                <td class="amount">{{ t.amount | number:'1.3-3' }}</td>
                <td>{{ t.status }}</td>
                <td><input type="checkbox" [(ngModel)]="t.allocated"/></td>
              </tr>
            </tbody>
          </table>
          <div *ngIf="!currentTransactions.length" class="no-records">No transactions available for this account.</div>
          <div class="bta-actions" *ngIf="currentTransactions.length">
            <button class="bta-btn bta-btn-primary" (click)="allocate()">Allocate Selected</button>
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
    .bta-field-row   { display:flex; align-items:center; gap:16px; flex-wrap:wrap; }
    .field-label     { font-size:12px; color:#333; line-height:1.8; }
    .bta-select-wide { padding:4px 8px; font-size:12px; border:1px solid #aaa; min-width:340px; font-family:Arial,sans-serif; }
    .btn-row         { display:flex; gap:10px; }
    .bta-btn         { padding:4px 14px; font-size:12px; font-family:Arial,sans-serif; cursor:pointer; border-radius:2px; }
    .bta-btn-primary  { background:#1e3a6e; color:#fff; border:1px solid #1e3a6e; }
    .bta-btn-secondary { background:#fff; color:#333; border:1px solid #aaa; }
    .bta-table       { width:100%; border-collapse:collapse; font-size:12px; }
    .bta-table th    { background:#cfe2f3; border:1px solid #b8d0e8; padding:7px 10px; font-weight:bold; color:#1e3a6e; text-align:left; }
    .bta-table td    { border:1px solid #dde4ed; padding:7px 10px; }
    .amount          { text-align:right; font-family:monospace; }
    .no-records      { font-size:12px; color:#555; padding:12px 0; }
    .bta-actions     { margin-top:12px; }
  `]
})
export class BtaPaymentAllocationComponent {
  view = '';
  selectedAccount = 'BTACLIENTBAH001-3744XXXXXXX5229';
  accounts = [
    { value:'BTACLIENTBAH001-3744XXXXXXX5229', label:'BTACLIENTBAH001-3744XXXXXXX5229' },
    { value:'BTACLIENTBAH002-3744XXXXXXX6130', label:'BTACLIENTBAH002-3744XXXXXXX6130' },
  ];

  unbilledTransactions: Transaction[] = [
    { date:'15/03/2025', description:'Emirates Airlines - Ticket', reference:'EMR-290344', amount:450.750, status:'Unbilled', allocated:false },
    { date:'18/03/2025', description:'Hilton Dubai – Hotel Stay', reference:'HTL-192833', amount:289.500, status:'Unbilled', allocated:false },
    { date:'20/03/2025', description:'Hertz Car Rental',          reference:'CAR-003921', amount:85.000,  status:'Unbilled', allocated:false },
  ];
  billedTransactions: Transaction[] = [
    { date:'01/02/2025', description:'Etihad Airways – Business Class', reference:'ETH-110293', amount:1250.000, status:'Billed', allocated:true  },
    { date:'05/02/2025', description:'Rotana Hotel Abu Dhabi',          reference:'ROT-884432', amount:320.500,  status:'Billed', allocated:false },
  ];

  get currentTransactions() {
    return this.view === 'unbilled' ? this.unbilledTransactions : this.billedTransactions;
  }
  allocate() { alert('Selected transactions allocated successfully.'); }
}
