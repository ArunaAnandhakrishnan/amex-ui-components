import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'amex-forgot-password-form',
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

      <!-- ONLS header -->
      <div class="header-onls" *ngIf="portalStyle === 'onls'">
        <div class="logo-box"><span class="logo-text">AMERICAN<br>EXPRESS</span></div>
      </div>

      <!-- OMS header -->
      <div class="header-oms" *ngIf="portalStyle === 'oms'">
        <div class="logo-box"><span class="logo-text">AMERICAN<br>EXPRESS</span></div>
        <div class="oms-title-wrap">
          <span class="oms-title">{{ portalTitle || 'Online Merchant Services' }}</span>
          <span class="oms-sub">MANAGE YOUR ACCOUNT ONLINE</span>
        </div>
      </div>

      <!-- Nav -->
      <div class="nav-onls" *ngIf="portalStyle === 'onls'">
        <span class="nav-item-onls active">Forgot Password</span>
      </div>
      <div class="nav-oms" *ngIf="portalStyle === 'oms'">
        <span class="nav-item-oms active">Forgot Password</span>
      </div>

      <!-- Content -->
      <div class="content-wrapper">
        <div class="hatched-sidebar" *ngIf="portalStyle === 'onls'"></div>
        <div class="main-content">

          <div class="panel-onls" *ngIf="portalStyle === 'onls'">

            <div class="success-box" *ngIf="submitted && !errorMessage">
              Your temporary password has been sent to your registered email address.
            </div>
            <div class="error-box" *ngIf="errorMessage">{{ errorMessage }}</div>

            <ng-container *ngIf="!submitted || errorMessage">
              <p class="help-text">Please enter your User Name or Email address. A temporary password will be sent to your registered email.</p>
              <div class="field-row">
                <label class="field-label">User Name / Email <span class="req">*</span></label>
                <input type="text" class="field-input" [(ngModel)]="identifier" />
              </div>
              <div class="btn-row-onls">
                <button class="btn-submit-onls" (click)="onSubmit()">Submit</button>
              </div>
            </ng-container>
            <div class="back-link" *ngIf="submitted && !errorMessage">
              <a class="form-link" (click)="backToLogin.emit()">Back to Login</a>
            </div>
          </div>

          <div class="panel-oms" *ngIf="portalStyle === 'oms'">
            <div class="panel-title">FORGOT PASSWORD</div>
            <div class="panel-accent"></div>

            <div class="success-box" *ngIf="submitted && !errorMessage">
              Your temporary password has been sent to your registered email address.
            </div>
            <div class="error-box" *ngIf="errorMessage">{{ errorMessage }}</div>

            <ng-container *ngIf="!submitted || errorMessage">
              <p class="help-text">Please enter your User Name or registered Email Address to receive a temporary password.</p>
              <div class="field-row">
                <label class="field-label">User Name / Email <span class="req">*</span></label>
                <input type="text" class="field-input-oms" [(ngModel)]="identifier" />
              </div>
              <div class="btn-row-oms">
                <button class="btn-back-oms" (click)="backToLogin.emit()">Back to Login</button>
                <button class="btn-submit-oms" (click)="onSubmit()">Submit</button>
              </div>
            </ng-container>
            <div class="back-link" *ngIf="submitted && !errorMessage">
              <a class="form-link" (click)="backToLogin.emit()">&#8592; Back to Login</a>
            </div>
          </div>

        </div>
      </div>

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
    .amex-shell { font-family: Arial, sans-serif; font-size: 12px; min-height: 380px; display: flex; flex-direction: column; border: 1px solid #ccc; }
    .onls-style { background: #f0f0f0; }
    .oms-style { background: #e8e8e8; }

    /* ONLS top bar */
    .top-bar { background: #1a3a6b; color: #aac8f0; padding: 2px 10px; font-size: 11px; display: flex; justify-content: flex-end; gap: 14px; }
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

    /* ONLS nav */
    .nav-onls { background: #fff; padding: 0 10px; border-bottom: 2px solid #ddd; display: flex; }
    .nav-item-onls { display: inline-block; padding: 6px 14px; font-size: 12px; font-weight: bold; color: #006fcf; border-bottom: 3px solid #006fcf; cursor: pointer; }

    /* OMS nav */
    .nav-oms { background: #5a6a7a; padding: 0 10px; display: flex; }
    .nav-item-oms { display: inline-block; padding: 7px 16px; font-size: 12px; color: #fff; cursor: pointer; font-weight: bold; background: #3a4a5a; }

    .content-wrapper { display: flex; flex: 1; }
    .hatched-sidebar { width: 130px; min-height: 200px; background: repeating-linear-gradient(135deg, #c8c8c8 0px, #c8c8c8 1px, #e8e8e8 1px, #e8e8e8 8px); flex-shrink: 0; }
    .main-content { flex: 1; padding: 20px 30px; }

    /* ONLS panel */
    .panel-onls { background: #fff; border: 1px solid #ccc; padding: 18px 22px; max-width: 440px; }

    /* OMS panel */
    .panel-oms { background: #fff; padding: 20px 24px; max-width: 480px; border-radius: 2px; }
    .panel-title { font-size: 16px; font-weight: bold; color: #222; }
    .panel-accent { height: 3px; background: #7b1fa2; margin: 8px 0 16px 0; }

    .help-text { color: #444; font-size: 12px; margin: 0 0 14px 0; line-height: 1.5; }

    .error-box { background: #f2dede; border: 1px solid #ebccd1; color: #a94442; padding: 8px 12px; margin-bottom: 12px; }
    .success-box { background: #dff0d8; border: 1px solid #c3e6cb; color: #3c763d; padding: 10px 14px; margin-bottom: 14px; }

    .field-row { display: flex; align-items: center; margin-bottom: 12px; }
    .field-label { width: 160px; text-align: right; padding-right: 10px; color: #333; font-size: 12px; flex-shrink: 0; }
    .req { color: #cc0000; }

    /* ONLS input */
    .field-input { width: 200px; height: 22px; border: 1px solid #999; padding: 2px 4px; font-size: 12px; }
    /* OMS input */
    .field-input-oms { flex: 1; max-width: 240px; height: 28px; border: 1px solid #bbb; padding: 2px 6px; font-size: 12px; border-radius: 2px; }

    /* ONLS button row */
    .btn-row-onls { margin-top: 14px; display: flex; justify-content: flex-end; }
    .btn-submit-onls { background: linear-gradient(to bottom, #1a7fe8, #005baa); color: #fff; border: 1px solid #004a99; padding: 5px 18px; font-size: 12px; font-weight: bold; cursor: pointer; border-radius: 3px; }

    /* OMS button row */
    .btn-row-oms { display: flex; gap: 12px; margin-top: 16px; }
    .btn-back-oms { background: #1e3a5f; color: #fff; border: none; padding: 7px 20px; font-size: 12px; font-weight: bold; cursor: pointer; border-radius: 2px; }
    .btn-submit-oms { background: #7b1fa2; color: #fff; border: none; padding: 7px 24px; font-size: 12px; font-weight: bold; cursor: pointer; border-radius: 2px; }

    .back-link { margin-top: 12px; }
    .form-link { color: #006fcf; cursor: pointer; font-size: 12px; text-decoration: underline; }

    .footer-links { background: #f5f5f5; border-top: 1px solid #ddd; padding: 5px 10px; font-size: 10px; color: #666; display: flex; flex-wrap: wrap; gap: 4px; }
    .footer-link { color: #006fcf; cursor: pointer; }
    .footer-copy { margin-left: auto; }
  `]
})
export class AmexForgotPasswordFormComponent {
  @Input() portalStyle: 'onls' | 'oms' = 'onls';
  @Input() portalTitle = '';
  @Input() errorMessage = '';

  @Output() submitIdentifier = new EventEmitter<string>();
  @Output() backToLogin = new EventEmitter<void>();

  identifier = '';
  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.submitIdentifier.emit(this.identifier);
  }
}
