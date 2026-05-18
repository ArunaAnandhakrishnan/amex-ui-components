import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AmexPageHeaderComponent,
  AmexBreadcrumbTrailComponent,
} from '@vn-core-ui-components/ui';

@Component({
  selector: 'app-supp-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmexPageHeaderComponent,
    AmexBreadcrumbTrailComponent,
  ],
  template: `
    <amex-page-header portalStyle="onls" title="SUPPLEMENTARY ACCESS HELPER"></amex-page-header>

    <amex-breadcrumb-trail
      [items]="[{ id: 'home', label: 'Home' }, { id: 'supp', label: 'Supplementary Access Helper' }]"
      [showBack]="false">
    </amex-breadcrumb-trail>

    <div class="supp-page">

      <!-- ── Search Row ── -->
      <div class="search-section">
        <div class="section-title">Supplementary Access Administration</div>
        <div class="search-row">
          <label class="search-label">Please enter a UCI</label>
          <input
            class="search-input"
            type="text"
            [(ngModel)]="uciValue"
            placeholder=""
          />
          <span class="or-text">or a User Id</span>
          <input
            class="search-input"
            type="text"
            [(ngModel)]="userIdValue"
            placeholder=""
          />
          <button class="btn-search" (click)="onSearch()">Search</button>
          <button class="btn-reset" (click)="onReset()">Reset</button>
        </div>
      </div>

      <!-- ── Access Group Table ── -->
      <ng-container *ngIf="searched && accessGroup.length > 0">
        <div class="section-header">
          Access Group: Family - {{ accessGroupId }}
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Emboss Name</th>
              <th>Uci</th>
              <th>Masked Card</th>
              <th>Is Admin UCI</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of accessGroup">
              <td>{{ row.embossName }}</td>
              <td>{{ row.uci }}</td>
              <td>{{ row.maskedCard }}</td>
              <td>{{ row.isAdminUci ? '✓' : '' }}</td>
            </tr>
          </tbody>
        </table>
      </ng-container>

      <!-- ── User Information Table ── -->
      <ng-container *ngIf="searched && userInfo">
        <div class="section-header" style="margin-top: 18px;">
          User Information
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Account Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ userInfo.userId }}</td>
              <td>{{ userInfo.accountStatus }}</td>
              <td>
                <button class="btn-action" (click)="onLockUser()">
                  {{ userInfo.accountStatus === 'Locked' ? 'Unlock User' : 'Lock User' }}
                </button>
                <button class="btn-action" (click)="onDeleteUser()">Delete User</button>
                <button class="btn-action" (click)="goToOffers()">Offers</button>
                <button class="btn-action" (click)="goToBenefits()">Benefits</button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- ── Lock success message ── -->
        <div class="lock-success" *ngIf="lockMessage">
          {{ lockMessage }}
        </div>

        <!-- ── User Details ── -->
        <div class="user-details">
          <div class="detail-row">
            <span class="detail-label">User Status</span>
            <span class="detail-value">{{ userInfo.userStatus }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Mail</span>
            <span class="detail-value">{{ userInfo.mail }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Mobile No</span>
            <span class="detail-value">{{ userInfo.mobileNo }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Registration Date</span>
            <span class="detail-value">{{ userInfo.registrationDate }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Last Login</span>
            <span class="detail-value">{{ userInfo.lastLogin }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Secret Question 1</span>
            <span class="detail-value"></span>
          </div>
          <div class="detail-row">
            <span class="detail-label indent">Secret Answer 1</span>
            <span class="detail-value"></span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Secret Question 2</span>
            <span class="detail-value"></span>
          </div>
          <div class="detail-row">
            <span class="detail-label indent">Secret Answer 2</span>
            <span class="detail-value"></span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Secret Question 3</span>
            <span class="detail-value"></span>
          </div>
          <div class="detail-row">
            <span class="detail-label indent">Secret Answer 3</span>
            <span class="detail-value"></span>
          </div>
        </div>
      </ng-container>

      <!-- ── Not found ── -->
      <div *ngIf="searched && !userInfo" class="no-results">
        No supplementary card member found for the given search criteria.
      </div>

    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; font-size: 12px; color: #333; }

    .supp-page { padding: 14px 16px; }

    /* ── Search section ── */
    .search-section {
      border: 1px solid #b0cce0;
      background: #fff;
      margin-bottom: 16px;
    }
    .section-title {
      background: #d6e8f5;
      border-bottom: 1px solid #7aaecf;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: bold;
      color: #1a3a5c;
    }
    .search-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      padding: 10px 12px;
    }
    .search-label {
      font-size: 12px;
      white-space: nowrap;
    }
    .or-text {
      font-size: 12px;
      white-space: nowrap;
    }
    .search-input {
      border: 1px solid #999;
      padding: 3px 6px;
      font-size: 12px;
      height: 24px;
      width: 160px;
    }
    .btn-search {
      background: #5b8db8;
      color: #fff;
      border: 1px solid #4a7aa0;
      padding: 3px 12px;
      font-size: 12px;
      cursor: pointer;
      height: 24px;
    }
    .btn-search:hover { background: #4a7aa0; }
    .btn-reset {
      background: #e8e8e8;
      color: #333;
      border: 1px solid #aaa;
      padding: 3px 12px;
      font-size: 12px;
      cursor: pointer;
      height: 24px;
    }
    .btn-reset:hover { background: #d5d5d5; }

    /* ── Section headers ── */
    .section-header {
      background: #c5dcee;
      border: 1px solid #7aaecf;
      padding: 5px 10px;
      font-size: 12px;
      font-weight: bold;
      color: #1a3a5c;
      margin-bottom: 0;
    }

    /* ── Tables ── */
    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
      border: 1px solid #7aaecf;
      border-top: none;
    }
    .data-table th {
      background: #ddeeff;
      border: 1px solid #a8c8e8;
      padding: 4px 8px;
      text-align: left;
      font-weight: bold;
      color: #1a3a5c;
    }
    .data-table td {
      border: 1px solid #c8dcea;
      padding: 4px 8px;
      background: #fff;
    }
    .data-table tbody tr:hover td { background: #f0f7ff; }

    /* ── Action buttons ── */
    .btn-action {
      background: #5b8db8;
      color: #fff;
      border: 1px solid #4a7aa0;
      padding: 2px 10px;
      font-size: 11px;
      cursor: pointer;
      margin-right: 4px;
      height: 22px;
    }
    .btn-action:hover { background: #4a7aa0; }

    /* ── Lock success message ── */
    .lock-success {
      background: #dff0d8;
      border: 1px solid #a3c98a;
      color: #3a6e28;
      padding: 6px 12px;
      font-size: 12px;
      margin-top: 8px;
    }

    /* ── User details ── */
    .user-details {
      margin-top: 12px;
      font-size: 12px;
    }
    .detail-row {
      display: flex;
      padding: 2px 0;
    }
    .detail-label {
      width: 160px;
      font-weight: bold;
      color: #333;
      flex-shrink: 0;
      padding-left: 4px;
    }
    .detail-label.indent {
      padding-left: 20px;
      font-weight: normal;
    }
    .detail-value { color: #333; }

    /* ── No results ── */
    .no-results {
      border: 1px solid #f5c6c6;
      background: #ffeaea;
      color: #cc0000;
      padding: 10px 14px;
      font-size: 12px;
      max-width: 480px;
    }
  `],
})
export class SuppSearchComponent {

  uciValue      = '';
  userIdValue   = '';
  searched      = false;
  accessGroupId = '11208';
  lockMessage   = '';

  accessGroup: {
    embossName: string;
    uci: string;
    maskedCard: string;
    isAdminUci: boolean;
  }[] = [];

  userInfo: {
    userId: string;
    accountStatus: string;
    userStatus: string;
    mail: string;
    mobileNo: string;
    registrationDate: string;
    lastLogin: string;
  } | null = null;

  constructor(private router: Router) {}

  onSearch(): void {
    if (!this.uciValue && !this.userIdValue) return;

    this.searched = true;

    // Mock data — replace with real API call
    this.accessGroup = [
      { embossName: 'DEV ANAND',  uci: 'DE8522VS', maskedCard: '3744XXXXXXXX2263', isAdminUci: false },
      { embossName: 'DEV ANAND',  uci: 'DE8518HS', maskedCard: '3744XXXXXXXX2198', isAdminUci: false },
      { embossName: 'LINKE INKE', uci: 'DE8539VS', maskedCard: '3744XXXXXXXX2297', isAdminUci: false },
      { embossName: 'MARY SMITH', uci: 'DE8528KS', maskedCard: '3744XXXXXXXX2271', isAdminUci: true  },
    ];

    this.userInfo = {
      userId:           this.userIdValue || 'Supp15',
      accountStatus:    'Unlocked',
      userStatus:       'Active',
      mail:             'murali.esakkimuthu@americanexpress.com.bh',
      mobileNo:         '93 12121212121',
      registrationDate: 'Feb 18 2023 12:11:04 PM AST',
      lastLogin:        '29/9/2024 1:51:21 PM AST',
    };
  }

  onReset(): void {
    this.uciValue    = '';
    this.userIdValue = '';
    this.searched    = false;
    this.accessGroup = [];
    this.userInfo    = null;
    this.lockMessage = '';
  }

  onLockUser(): void {
    if (this.userInfo) {
      if (this.userInfo.accountStatus === 'Locked') {
        this.userInfo.accountStatus = 'Unlocked';
        this.lockMessage = 'Account has been unlocked successfully';
      } else {
        this.userInfo.accountStatus = 'Locked';
        this.lockMessage = 'Account has been locked successfully';
      }
      setTimeout(() => this.lockMessage = '', 4000);
    }
  }

  onDeleteUser(): void {
    this.searched    = false;
    this.accessGroup = [];
    this.userInfo    = null;
    this.lockMessage = '';
  }

  // ── Navigate to shell-level Offers MFE (port 4204) ──────────────────────
  goToOffers(): void {
    window.location.href = '/offers';        // ← shell handles /offers route
  }

  // ── Navigate to shell-level Benefits MFE ────────────────────────────────
  goToBenefits(): void {
    window.location.href = '/offers/benefits';      // ← shell handles /benefits route
  }
}