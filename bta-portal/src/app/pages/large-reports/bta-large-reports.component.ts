import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AmexPageHeaderComponent, AmexBreadcrumbTrailComponent } from '@vn-core-ui-components/ui';

@Component({
    selector: 'app-bta-large-reports',
    imports: [CommonModule, FormsModule, AmexPageHeaderComponent, AmexBreadcrumbTrailComponent],
    template: `
    <amex-page-header portalStyle="onls" title="LARGE REPORTS"></amex-page-header>
    <amex-breadcrumb-trail
      [items]="[{id:'home',label:'Home'},{id:'bta',label:'BTA Portal'},{id:'lr',label:'Large Reports'}]"
      [showBack]="true" (backClick)="goBack()">
    </amex-breadcrumb-trail>

    <div class="bta-page">
      <div class="bta-panel">
        <div class="bta-panel-hd">Large Reports</div>
        <div class="bta-panel-bd">

          <div class="bta-form-section">
            <div class="bta-field-row">
              <label>Select the BTA Number:</label>
              <select [(ngModel)]="selectedAccount" class="bta-select-wide">
                <option *ngFor="let a of accounts" [value]="a.value">{{ a.label }}</option>
              </select>
            </div>

            <div class="bta-field-row" style="margin-top:12px;">
              <label>Report Type:</label>
              <div class="radio-group-h">
                <label *ngFor="let rt of reportTypes">
                  <input type="radio" [(ngModel)]="reportType" [value]="rt.value"/> {{ rt.label }}
                </label>
              </div>
            </div>

            <div class="bta-field-row" style="margin-top:12px;">
              <label>Date Range:</label>
              <div class="date-range-row">
                <label>From:</label>
                <select [(ngModel)]="fromMonth" class="bta-select-sm">
                  <option *ngFor="let m of months" [value]="m">{{ m }}</option>
                </select>
                <select [(ngModel)]="fromYear" class="bta-select-sm">
                  <option *ngFor="let y of years" [value]="y">{{ y }}</option>
                </select>
                <label>To:</label>
                <select [(ngModel)]="toMonth" class="bta-select-sm">
                  <option *ngFor="let m of months" [value]="m">{{ m }}</option>
                </select>
                <select [(ngModel)]="toYear" class="bta-select-sm">
                  <option *ngFor="let y of years" [value]="y">{{ y }}</option>
                </select>
              </div>
            </div>

            <div class="bta-field-row" style="margin-top:12px;">
              <label>Report Format:</label>
              <div class="radio-group-h">
                <label *ngFor="let f of formats">
                  <input type="radio" [(ngModel)]="format" [value]="f"/> {{ f }}
                </label>
              </div>
            </div>
          </div>

          <div class="bta-actions">
            <button class="bta-btn bta-btn-secondary" (click)="reset()">Reset</button>
            <button class="bta-btn bta-btn-primary" (click)="generate()">Generate Report</button>
          </div>

          <div *ngIf="generated" class="success-msg">
            ✓ Report queued for generation. You will be notified when it is ready for download.
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
    .bta-form-section { display:flex; flex-direction:column; gap:0; }
    .bta-field-row   { display:flex; align-items:flex-start; gap:12px; flex-wrap:wrap; }
    .bta-field-row label:first-child { font-size:12px; font-weight:bold; color:#333; min-width:140px; padding-top:4px; }
    .bta-select-wide { padding:4px 8px; font-size:12px; border:1px solid #aaa; min-width:300px; font-family:Arial,sans-serif; }
    .bta-select-sm   { padding:3px 6px; font-size:12px; border:1px solid #aaa; font-family:Arial,sans-serif; }
    .radio-group-h   { display:flex; gap:16px; flex-wrap:wrap; }
    .radio-group-h label { display:flex; align-items:center; gap:5px; font-size:12px; cursor:pointer; }
    .date-range-row  { display:flex; align-items:center; gap:8px; flex-wrap:wrap; font-size:12px; }
    .bta-actions     { display:flex; gap:10px; margin-top:20px; }
    .bta-btn         { padding:5px 16px; font-size:12px; font-family:Arial,sans-serif; cursor:pointer; border-radius:2px; }
    .bta-btn-primary  { background:#1e3a6e; color:#fff; border:1px solid #1e3a6e; }
    .bta-btn-primary:hover { background:#2d5499; }
    .bta-btn-secondary { background:#fff; color:#333; border:1px solid #aaa; }
    .success-msg     { margin-top:14px; padding:10px 14px; background:#e6f9f0; color:#1a7a4a; border:1px solid #b7e4ce; font-size:12px; border-radius:2px; }
  `]
})
export class BtaLargeReportsComponent {
  generated = false;
  selectedAccount = 'BTACLIENTBAH001-3744XXXXXXX5229';
  reportType = 'detailed';
  format = 'PDF';
  fromMonth = 'January'; fromYear = '2025'; toMonth = 'March'; toYear = '2025';

  accounts = [
    { value:'BTACLIENTBAH001-3744XXXXXXX5229', label:'BTACLIENTBAH001-3744XXXXXXX5229' },
    { value:'BTACLIENTBAH002-3744XXXXXXX6130', label:'BTACLIENTBAH002-3744XXXXXXX6130' },
  ];
  reportTypes = [
    { value:'detailed', label:'Detailed Statement' },
    { value:'summary',  label:'Summary Statement'  },
    { value:'audit',    label:'Audit Trail'         },
  ];
  formats = ['PDF','Excel','CSV','RTF'];
  months  = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  years   = ['2025','2024','2023','2022','2021'];

  reset() { this.generated = false; this.reportType='detailed'; this.format='PDF'; }
  generate() { this.generated = true; }
  goBack() {}
}
