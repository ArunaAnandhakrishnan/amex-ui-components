import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'amex-change-password-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="amex-shell" [class.onls-style]="portalStyle === 'onls'" [class.oms-style]="portalStyle === 'oms'">

      <!-- ONLS top bar -->
      <div class="top-bar" *ngIf="portalStyle === 'onls'">
        <span class="global-sites">Global Sites</span>
        <span class="log-out">Log Out</span>
      </div>

      <!-- OMS top bar -->
      <div class="top-bar-oms" *ngIf="portalStyle === 'oms'">
        <button class="oms-logout-btn">LOG OUT</button>
      </div>

      <!-- ONLS Header -->
      <div class="header-onls" *ngIf="portalStyle === 'onls'">
        <div class="logo-box"><span class="logo-text">AMERICAN<br>EXPRESS</span></div>
      </div>

      <!-- OMS Header -->
      <div class="header-oms" *ngIf="portalStyle === 'oms'">
        <div class="logo-box"><span class="logo-text">AMERICAN<br>EXPRESS</span></div>
        <div class="oms-title-wrap">
          <span class="oms-title">{{ portalTitle || 'Online Merchant Services' }}</span>
          <span class="oms-sub">MANAGE YOUR ACCOUNT ONLINE</span>
        </div>
      </div>

      <!-- ONLS Nav -->
      <div class="nav-onls" *ngIf="portalStyle === 'onls'">
        <span class="nav-misc">MISC</span>
        <span class="nav-item">ONLINE ACCOUNT SERVICES</span>
        <span class="nav-item">STATEMENTS</span>
        <span class="nav-item">POINT BOOSTER</span>
        <span class="nav-item active">CHANGE PASSWORD</span>
        <span class="nav-item">BUREAU</span>
        <span class="nav-item">CENTURION</span>
        <span class="nav-item">VAT INVOICE</span>
      </div>

      <!-- OMS Nav -->
      <div class="nav-oms" *ngIf="portalStyle === 'oms'">
        <span class="nav-item-oms">Settlement and Submissions</span>
        <span class="nav-item-oms active">Change Your Password</span>
        <span class="nav-item-oms">Customized Reports</span>
      </div>

      <!-- Content -->
      <div class="content-wrapper">
        <div class="hatched-sidebar" *ngIf="portalStyle === 'onls'"></div>
        <div class="main-content">

          <!-- ONLS Panel - exact match from screenshot -->
          <div class="panel-onls" *ngIf="portalStyle === 'onls'">

            <div class="panel-header-onls">Change Password</div>

            <div class="success-banner" *ngIf="successMessage">
              {{ successMessage }}
            </div>
            <div class="error-inline" *ngIf="errorMessage">{{ errorMessage }}</div>

            <p class="required-note-onls">*All fields are required</p>

            <div class="field-row">
              <label class="field-label-onls">Current Password <span class="req">*</span></label>
              <input type="password" class="field-input-onls" [(ngModel)]="data.currentPassword" />
            </div>
            <div class="field-row">
              <label class="field-label-onls">New Password <span class="req">*</span></label>
              <input type="password" class="field-input-onls" [(ngModel)]="data.newPassword" />
            </div>
            <div class="field-row">
              <label class="field-label-onls">Re-enter New Password <span class="req">*</span></label>
              <input type="password" class="field-input-onls" [(ngModel)]="data.confirmPassword" />
            </div>

            <div class="btn-row-onls">
              <button class="btn-change-onls" (click)="onSubmit()">Change Password</button>
            </div>

          </div>

          <!-- OMS Panel -->
          <div class="panel-oms" *ngIf="portalStyle === 'oms'">
            <div class="panel-title-oms">CHANGE YOUR PASSWORD</div>
            <div class="panel-accent"></div>

            <div class="success-banner" *ngIf="successMessage">{{ successMessage }}</div>
            <div class="error-box-oms" *ngIf="errorMessage">{{ errorMessage }}</div>

            <p class="required-note-oms">* All fields are required</p>

            <div class="field-row">
              <label class="field-label-oms">Current Password <span class="req">*</span></label>
              <input type="password" class="field-input-oms" [(ngModel)]="data.currentPassword" />
            </div>
            <div class="field-row">
              <label class="field-label-oms">New Password <span class="req">*</span></label>
              <input type="password" class="field-input-oms" [(ngModel)]="data.newPassword" />
            </div>
            <div class="field-row">
              <label class="field-label-oms">Confirm New Password <span class="req">*</span></label>
              <input type="password" class="field-input-oms" [(ngModel)]="data.confirmPassword" />
            </div>

            <div class="btn-row-oms">
              <button class="btn-back-oms" (click)="cancel.emit()">Cancel</button>
              <button class="btn-submit-oms" (click)="onSubmit()">Update Password</button>
            </div>
          </div>

        </div>
      </div>

      <!-- Footer -->
      <div class="footer-links">
        <a class="footer-link">American Express Web Site Rules and Regulations</a> |
        <a class="footer-link">News Centre</a> |
        <a class="footer-link">Fraud Protection Centre</a> |
        <a class="footer-link">Trademarks</a> |
        <a class="footer-link">Privacy Statement</a>
        <span class="footer-copy">Copyright &copy; 2009 American Express Company</span>
      </div>
    </div>
  `,
  styles: [`
    .amex-shell { font-family: Arial, sans-serif; font-size: 12px; min-height: 440px; display: flex; flex-direction: column; border: 1px solid #ccc; }
    .onls-style { background: #f0f0f0; }
    .oms-style { background: #e8e8e8; }

    /* ONLS top bar */
    .top-bar { background: #1a3a6b; padding: 2px 10px; font-size: 11px; display: flex; justify-content: flex-end; gap: 14px; }
    .global-sites { color: #aac8f0; cursor: pointer; }
    .log-out { color: #fff; cursor: pointer; }

    /* OMS top bar */
    .top-bar-oms { background: #fff; display: flex; justify-content: flex-end; padding: 4px 10px; border-bottom: 1px solid #eee; }
    .oms-logout-btn { background: #1e3a5f; color: #fff; border: none; padding: 4px 14px; font-size: 11px; font-weight: bold; cursor: pointer; }

    /* ONLS header */
    .header-onls { background: #fff; padding: 6px 10px; display: flex; align-items: center; border-bottom: 1px solid #ddd; }

    /* OMS header */
    .header-oms { background: #fff; padding: 8px 12px; display: flex; align-items: center; border-bottom: 1px solid #ddd; }
    .oms-title-wrap { margin-left: 14px; }
    .oms-title { display: block; font-size: 20px; font-weight: bold; color: #006fcf; letter-spacing: 1px; }
    .oms-sub { display: block; font-size: 10px; color: #666; letter-spacing: 1px; }

    .logo-box { background: #016fd0; padding: 4px 8px; width: 60px; height: 36px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .logo-text { color: #fff; font-size: 8px; font-weight: bold; line-height: 1.2; text-align: center; }

    /* ONLS nav - exact match screenshot: horizontal tabs */
    .nav-onls { background: #fff; border-bottom: 2px solid #ddd; padding: 0 10px; display: flex; flex-wrap: wrap; gap: 0; }
    .nav-misc { display: inline-block; padding: 6px 10px; font-size: 11px; color: #333; font-weight: bold; cursor: pointer; }
    .nav-item { display: inline-block; padding: 6px 10px; font-size: 11px; color: #333; cursor: pointer; font-weight: bold; }
    .nav-item.active { color: #006fcf; border-bottom: 3px solid #006fcf; }

    /* OMS nav */
    .nav-oms { background: #5a6a7a; padding: 0 10px; display: flex; }
    .nav-item-oms { display: inline-block; padding: 7px 14px; font-size: 12px; color: #ccc; cursor: pointer; }
    .nav-item-oms.active { background: #3a4a5a; color: #fff; font-weight: bold; }

    .content-wrapper { display: flex; flex: 1; }
    .hatched-sidebar { width: 130px; background: repeating-linear-gradient(135deg, #c8c8c8 0px, #c8c8c8 1px, #e8e8e8 1px, #e8e8e8 8px); flex-shrink: 0; }
    .main-content { flex: 1; padding: 20px 30px; }

    /* ONLS panel - exact match from screenshot */
    .panel-onls { background: #fff; border: 1px solid #b0c8e8; max-width: 540px; }
    .panel-header-onls { background: #d4e8f8; color: #006fcf; font-weight: bold; font-size: 13px; padding: 8px 14px; border-bottom: 1px solid #b0c8e8; }

    .success-banner { background: #dff0d8; border: 1px solid #c3e6cb; color: #3c763d; padding: 8px 14px; margin: 10px 14px; }
    .error-inline { color: #cc0000; padding: 6px 14px; font-size: 12px; }
    .required-note-onls { font-size: 11px; color: #555; margin: 8px 14px 4px 14px; }
    .req { color: #cc0000; }

    .field-row { display: flex; align-items: center; margin: 8px 14px; }
    .field-label-onls { width: 180px; text-align: right; padding-right: 10px; color: #333; font-size: 12px; flex-shrink: 0; }
    .field-input-onls { width: 200px; height: 22px; border: 1px solid #999; padding: 2px 4px; font-size: 12px; }

    .btn-row-onls { display: flex; justify-content: flex-end; padding: 10px 14px 14px; }
    .btn-change-onls { background: linear-gradient(to bottom, #1a7fe8, #005baa); color: #fff; border: 1px solid #004a99; padding: 5px 18px; font-size: 12px; font-weight: bold; cursor: pointer; border-radius: 3px; }

    /* OMS panel */
    .panel-oms { background: #fff; padding: 20px 24px; max-width: 480px; border-radius: 2px; }
    .panel-title-oms { font-size: 16px; font-weight: bold; color: #222; }
    .panel-accent { height: 3px; background: #7b1fa2; margin: 8px 0 16px 0; }
    .error-box-oms { background: #f2dede; border: 1px solid #ebccd1; color: #a94442; padding: 8px 12px; margin-bottom: 12px; }
    .required-note-oms { font-size: 11px; color: #555; margin: 0 0 10px 0; }
    .field-label-oms { width: 170px; text-align: right; padding-right: 12px; color: #333; font-size: 12px; flex-shrink: 0; }
    .field-input-oms { flex: 1; max-width: 220px; height: 28px; border: 1px solid #bbb; padding: 2px 6px; font-size: 12px; border-radius: 2px; }
    .btn-row-oms { display: flex; gap: 12px; margin-top: 16px; }
    .btn-back-oms { background: #1e3a5f; color: #fff; border: none; padding: 7px 20px; font-size: 12px; font-weight: bold; cursor: pointer; border-radius: 2px; }
    .btn-submit-oms { background: #7b1fa2; color: #fff; border: none; padding: 7px 24px; font-size: 12px; font-weight: bold; cursor: pointer; border-radius: 2px; }

    .footer-links { background: #f5f5f5; border-top: 1px solid #ddd; padding: 5px 10px; font-size: 10px; color: #666; display: flex; flex-wrap: wrap; gap: 4px; }
    .footer-link { color: #006fcf; cursor: pointer; }
    .footer-copy { margin-left: auto; }
  `]
})
export class AmexChangePasswordFormComponent {
  @Input() portalStyle: 'onls' | 'oms' = 'onls';
  @Input() portalTitle = '';
  @Input() errorMessage = '';
  @Input() successMessage = '';

  @Output() passwordSubmit = new EventEmitter<ChangePasswordData>();
  @Output() cancel = new EventEmitter<void>();

  data: ChangePasswordData = { currentPassword: '', newPassword: '', confirmPassword: '' };

  onSubmit() {
    this.passwordSubmit.emit({ ...this.data });
  }
}
