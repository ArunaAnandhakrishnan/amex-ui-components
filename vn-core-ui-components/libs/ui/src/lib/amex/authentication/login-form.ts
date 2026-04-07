import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface LoginCredentials {
  username: string;
  password: string;
}

@Component({
  selector: 'amex-login-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="amex-shell">
      <!-- Top bar -->
      <div class="top-bar">
        <span class="global-sites">Global Sites</span>
      </div>

      <!-- Header -->
      <div class="header">
        <div class="amex-logo">
          <div class="logo-box">
            <span class="logo-text">AMERICAN<br>EXPRESS</span>
          </div>
        </div>
        <div class="portal-title" *ngIf="portalTitle">
          <span class="portal-name">{{ portalTitle }}</span>
        </div>
      </div>

      <!-- Nav placeholder -->
      <div class="nav-bar">
        <span class="nav-item active">{{ portalTitle || 'Hub Login' }}</span>
      </div>

      <!-- Content -->
      <div class="content-wrapper">
        <div class="hatched-sidebar"></div>
        <div class="main-content">
          <div class="login-panel">

            <!-- Error message -->
            <div class="error-box" *ngIf="errorMessage">
              {{ errorMessage }}
            </div>

            <!-- Success message -->
            <div class="success-box" *ngIf="successMessage">
              {{ successMessage }}
            </div>

            <div class="field-row">
              <label class="field-label" for="username">
                User Name <span class="required">*</span>
              </label>
              <input
                id="username"
                type="text"
                class="field-input"
                [(ngModel)]="credentials.username"
                autocomplete="username"
              />
            </div>

            <div class="field-row">
              <label class="field-label" for="password">
                Password <span class="required">*</span>
              </label>
              <input
                id="password"
                type="password"
                class="field-input"
                [(ngModel)]="credentials.password"
                autocomplete="current-password"
              />
            </div>

            <div class="form-links">
              <a class="form-link" (click)="forgotUserId.emit()">Forgot User ID?</a>
              <a class="form-link" (click)="forgotPassword.emit()">Forgot Password?</a>
            </div>

            <div class="btn-row">
              <button class="btn-submit" (click)="onSubmit()">Login</button>
            </div>

            <div class="register-row" *ngIf="showRegister">
              <span>New user? </span>
              <a class="form-link" (click)="registerClick.emit()">Sign Up</a>
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
    .amex-shell { font-family: Arial, sans-serif; font-size: 12px; background: #f0f0f0; min-height: 500px; display: flex; flex-direction: column; border: 1px solid #ccc; }

    /* Top bar */
    .top-bar { background: #1a3a6b; color: #fff; text-align: right; padding: 2px 10px; font-size: 11px; display: flex; justify-content: flex-end; gap: 12px; }
    .global-sites { color: #aac8f0; cursor: pointer; }
    .global-sites:hover { text-decoration: underline; }

    /* Header */
    .header { background: #fff; padding: 6px 10px; display: flex; align-items: center; border-bottom: 1px solid #ddd; }
    .logo-box { background: #016fd0; padding: 4px 8px; display: flex; align-items: center; justify-content: center; width: 60px; height: 36px; }
    .logo-text { color: #fff; font-size: 8px; font-weight: bold; line-height: 1.2; text-align: center; }
    .portal-title { margin-left: 16px; }
    .portal-name { font-size: 13px; color: #333; font-weight: bold; }

    /* Nav */
    .nav-bar { background: #fff; padding: 0 10px; border-bottom: 2px solid #ddd; display: flex; gap: 0; }
    .nav-item { display: inline-block; padding: 6px 14px; font-size: 12px; font-weight: bold; color: #333; cursor: pointer; border-bottom: 3px solid transparent; }
    .nav-item.active { color: #006fcf; border-bottom-color: #006fcf; }

    /* Content */
    .content-wrapper { display: flex; flex: 1; }
    .hatched-sidebar { width: 130px; min-height: 300px; background: repeating-linear-gradient(135deg, #c8c8c8 0px, #c8c8c8 1px, #e8e8e8 1px, #e8e8e8 8px); flex-shrink: 0; }
    .main-content { flex: 1; padding: 20px 30px; }

    /* Login panel */
    .login-panel { background: #fff; border: 1px solid #ccc; padding: 20px 24px; max-width: 480px; }

    /* Error / success */
    .error-box { background: #f2dede; border: 1px solid #ebccd1; color: #a94442; padding: 8px 12px; margin-bottom: 14px; font-size: 12px; border-radius: 2px; }
    .success-box { background: #dff0d8; border: 1px solid #c3e6cb; color: #3c763d; padding: 8px 12px; margin-bottom: 14px; font-size: 12px; border-radius: 2px; }

    /* Fields */
    .field-row { display: flex; align-items: center; margin-bottom: 10px; }
    .field-label { width: 130px; text-align: right; padding-right: 10px; color: #333; font-size: 12px; flex-shrink: 0; }
    .required { color: #cc0000; }
    .field-input { width: 200px; height: 22px; border: 1px solid #999; padding: 2px 4px; font-size: 12px; }
    .field-input:focus { outline: 1px solid #006fcf; border-color: #006fcf; }

    /* Links */
    .form-links { display: flex; gap: 20px; margin: 8px 0 8px 140px; }
    .form-link { color: #006fcf; cursor: pointer; font-size: 11px; text-decoration: underline; }
    .form-link:hover { color: #003087; }

    /* Button row */
    .btn-row { margin-top: 14px; display: flex; justify-content: flex-end; padding-right: 4px; }
    .btn-submit { background: linear-gradient(to bottom, #1a7fe8, #005baa); color: #fff; border: 1px solid #004a99; padding: 5px 18px; font-size: 12px; font-weight: bold; cursor: pointer; border-radius: 3px; }
    .btn-submit:hover { background: linear-gradient(to bottom, #2a8ff8, #0065ba); }

    /* Register row */
    .register-row { margin-top: 10px; text-align: center; font-size: 11px; color: #555; }

    /* Footer */
    .footer-links { background: #f5f5f5; border-top: 1px solid #ddd; padding: 5px 10px; font-size: 10px; color: #666; display: flex; align-items: center; flex-wrap: wrap; gap: 4px; }
    .footer-link { color: #006fcf; cursor: pointer; }
    .footer-copy { margin-left: auto; }
  `]
})
export class AmexLoginFormComponent {
  @Input() portalTitle = '';
  @Input() errorMessage = '';
  @Input() successMessage = '';
  @Input() showRegister = false;

  @Output() loginSubmit = new EventEmitter<LoginCredentials>();
  @Output() forgotUserId = new EventEmitter<void>();
  @Output() forgotPassword = new EventEmitter<void>();
  @Output() registerClick = new EventEmitter<void>();

  credentials: LoginCredentials = { username: '', password: '' };

  onSubmit() {
    this.loginSubmit.emit({ ...this.credentials });
  }
}
