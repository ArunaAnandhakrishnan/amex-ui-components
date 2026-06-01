import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AmexPageHeaderComponent,
  AmexBreadcrumbTrailComponent,
  AmexAuditTrailRowComponent,
} from '@vn-core-ui-components/ui';

@Component({
    selector: 'app-bta-audit-trail',
    imports: [CommonModule, FormsModule, AmexPageHeaderComponent, AmexBreadcrumbTrailComponent],
    template: `
    <amex-page-header portalStyle="onls" title="AUDIT TRAIL"></amex-page-header>
    <amex-breadcrumb-trail
      [items]="[{id:'home',label:'Home'},{id:'bta',label:'BTA Portal'},{id:'at',label:'Audit Trail'}]"
      [showBack]="true" (backClick)="goBack()">
    </amex-breadcrumb-trail>

    <div class="bta-page">
      <div class="bta-panel">
        <div class="bta-panel-hd">Audit Trail</div>
        <div class="bta-panel-bd">

          <!-- Tabs: Detailed Report | Summary Report — matches document image19 -->
          <div class="audit-tabs">
            <button class="audit-tab" [class.active]="activeTab==='detailed'" (click)="activeTab='detailed'">Detailed Report</button>
            <button class="audit-tab" [class.active]="activeTab==='summary'"  (click)="activeTab='summary'">Summary Report</button>
          </div>

          <!-- ── DETAILED REPORT ── -->
          <div *ngIf="activeTab==='detailed'" class="tab-content">
            <div class="bta-field-row" style="margin-top:14px;">
              <label>View Audit Trail For:</label>
              <select [(ngModel)]="detailYear"  class="bta-select-sm">
                <option *ngFor="let y of years" [value]="y">{{ y }}</option>
              </select>
              <select [(ngModel)]="detailMonth" class="bta-select-sm">
                <option *ngFor="let m of months" [value]="m">{{ m }}</option>
              </select>
              <button class="bta-btn bta-btn-primary" (click)="showDetailedTrail()">Show Trail</button>
            </div>

            <div *ngIf="detailShown" class="trail-result">
              <div class="trail-meta">
                <div>Audit Trail For {{ detailMonth }}/{{ detailYear }}</div>
                <div>Corporation Name: TEST BTA 9</div>
                <div>Corporation Account No: 10026800010</div>
              </div>

              <div *ngIf="detailedRows.length === 0" class="no-records">Audit entries are not found for this search criteria</div>

              <table *ngIf="detailedRows.length" class="bta-table">
                <thead>
                  <tr><th>Date/Time</th><th>User ID</th><th>Action</th><th>Details</th><th>IP Address</th></tr>
                </thead>
                <tbody>
                  <tr *ngFor="let r of detailedRows">
                    <td>{{ r.datetime }}</td><td>{{ r.userId }}</td>
                    <td>{{ r.action }}</td><td>{{ r.details }}</td><td>{{ r.ip }}</td>
                  </tr>
                </tbody>
              </table>

              <div class="download-row" style="margin-top:12px;">
                <select class="bta-select-sm" [(ngModel)]="downloadFormat">
                  <option>PDF</option><option>Excel</option><option>CSV</option><option>RTF</option>
                </select>
                <button class="bta-btn bta-btn-primary" (click)="download()">Download Report</button>
              </div>
            </div>
          </div>

          <!-- ── SUMMARY REPORT ── -->
          <div *ngIf="activeTab==='summary'" class="tab-content">
            <div class="bta-field-row" style="margin-top:14px;">
              <label>Date From:</label>
              <input type="date" [(ngModel)]="summaryFrom" class="bta-date-input"/>
              <label>Date To:</label>
              <input type="date" [(ngModel)]="summaryTo" class="bta-date-input"/>
            </div>
            <div class="bta-field-row" style="margin-top:10px;">
              <label>Include Details:</label>
              <div class="checkbox-group">
                <label *ngFor="let opt of summaryOptions">
                  <input type="checkbox" [(ngModel)]="opt.checked"/> {{ opt.label }}
                </label>
              </div>
            </div>
            <div class="bta-actions" style="margin-top:14px;">
              <button class="bta-btn bta-btn-primary" (click)="showSummaryTrail()">Show Trail</button>
            </div>

            <div *ngIf="summaryShown" class="trail-result">
              <div class="no-records">Audit entries are not found for the selected date range.</div>
              <div class="download-row" style="margin-top:12px;">
                <select class="bta-select-sm" [(ngModel)]="downloadFormat">
                  <option>PDF</option><option>Excel</option><option>CSV</option><option>RTF</option>
                </select>
                <button class="bta-btn bta-btn-primary" (click)="download()">Download Report</button>
              </div>
            </div>
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
    .audit-tabs      { display:flex; border-bottom:2px solid #006fcf; gap:0; }
    .audit-tab       { padding:7px 18px; font-size:12px; font-family:Arial,sans-serif; cursor:pointer; border:1px solid #b8d0e8; border-bottom:none; background:#f5f9ff; color:#1e3a6e; margin-right:2px; border-radius:2px 2px 0 0; }
    .audit-tab.active { background:#006fcf; color:#fff; font-weight:bold; border-color:#006fcf; }
    .tab-content     { padding-top:4px; }
    .bta-field-row   { display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
    .bta-field-row label { font-size:12px; font-weight:bold; color:#333; white-space:nowrap; }
    .bta-select-sm   { padding:3px 8px; font-size:12px; border:1px solid #aaa; font-family:Arial,sans-serif; }
    .bta-date-input  { padding:3px 8px; font-size:12px; border:1px solid #aaa; font-family:Arial,sans-serif; }
    .checkbox-group  { display:flex; gap:16px; flex-wrap:wrap; }
    .checkbox-group label { display:flex; align-items:center; gap:5px; font-size:12px; cursor:pointer; }
    .bta-btn         { padding:4px 14px; font-size:12px; font-family:Arial,sans-serif; cursor:pointer; border-radius:2px; }
    .bta-btn-primary  { background:#1e3a6e; color:#fff; border:1px solid #1e3a6e; }
    .bta-btn-primary:hover { background:#2d5499; }
    .trail-result    { margin-top:14px; }
    .trail-meta      { font-size:12px; color:#1e3a6e; margin-bottom:12px; display:flex; flex-direction:column; gap:3px; }
    .no-records      { font-size:12px; color:#cc0000; padding:8px 0; }
    .bta-table       { width:100%; border-collapse:collapse; font-size:12px; }
    .bta-table th    { background:#cfe2f3; border:1px solid #b8d0e8; padding:7px 10px; font-weight:bold; color:#1e3a6e; text-align:left; }
    .bta-table td    { border:1px solid #dde4ed; padding:7px 10px; }
    .download-row    { display:flex; gap:8px; align-items:center; }
    .bta-actions     { }
  `]
})
export class BtaAuditTrailComponent {
  activeTab = 'detailed';
  detailYear = '2021'; detailMonth = 'October';
  detailShown = false; summaryShown = false;
  downloadFormat = 'PDF';
  summaryFrom = ''; summaryTo = '';

  years  = ['2025','2024','2023','2022','2021','2020'];
  months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

  summaryOptions = [
    { label:'Login/Logout', checked:true },
    { label:'User Management', checked:true },
    { label:'Report Downloads', checked:true },
    { label:'Payment Transactions', checked:false },
  ];

  detailedRows: any[] = [];  // Empty — matches document "no entries found"

  showDetailedTrail() { this.detailShown = true; }
  showSummaryTrail()  { this.summaryShown = true; }
  download() { alert(`Downloading in ${this.downloadFormat}`); }
  goBack() { this.detailShown = false; this.summaryShown = false; }
}
