import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],

  template: `
    <div class="onls-page">

      <!-- Header -->
      <div class="onls-header">
        <div class="onls-header-left">
          <div class="req-bar">REQUEST</div>
        </div>
      </div>

      <div class="onls-rule"></div>

      <!-- Body -->
      <div class="onls-body">

        <div class="onls-left-panel"></div>

        <div class="onls-content">

          <!-- SUCCESS -->
          <ng-container *ngIf="submitted">

            <div class="fp-title">FORGOT PASSWORD</div>

            <div class="success-banner">
              An Email has been sent to {{ sentEmail }}
              containing the User ID and Password.
            </div>

            <div class="fp-box">

              <form [formGroup]="fpForm">

                <div class="fp-row">
                  <label class="fp-label">
                    User Id <span class="req">*</span>
                  </label>

                  <input
                    class="fp-input"
                    type="text"
                    formControlName="userId"
                    readonly
                  />
                </div>

                <div class="fp-row">
                  <label class="fp-label">
                    Email <span class="req">*</span>
                  </label>

                  <input
                    class="fp-input"
                    type="email"
                    formControlName="email"
                    readonly
                  />
                </div>

                <div class="fp-actions">

                  <button
                    class="btn-submit"
                    type="button"
                    (click)="goLogin()"
                  >
                    Submit
                  </button>

                  <button
                    class="btn-cancel"
                    type="button"
                    (click)="goLogin()"
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>

          </ng-container>

          <!-- FORM -->
          <ng-container *ngIf="!submitted">

            <div class="fp-title">FORGOT PASSWORD</div>

            <div class="fp-box">

              <div
                class="onls-alert onls-alert-error"
                *ngIf="error"
              >
                &#9888; {{ error }}
              </div>

              <form
                [formGroup]="fpForm"
                (ngSubmit)="onSubmit()"
                novalidate
              >

                <div class="fp-row">

                  <label class="fp-label">
                    User Id <span class="req">*</span>
                  </label>

                  <input
                    class="fp-input"
                    type="text"
                    formControlName="userId"
                    [class.fp-invalid]="
                      fc['userId'].invalid &&
                      fc['userId'].touched
                    "
                  />

                </div>

                <div class="fp-row">

                  <label class="fp-label">
                    Email <span class="req">*</span>
                  </label>

                  <input
                    class="fp-input"
                    type="email"
                    formControlName="email"
                    [class.fp-invalid]="
                      fc['email'].invalid &&
                      fc['email'].touched
                    "
                  />

                </div>

                <div class="fp-actions">

                  <button
                    class="btn-submit"
                    type="submit"
                    [disabled]="loading"
                  >
                    {{ loading ? 'Sending…' : 'Submit' }}
                  </button>

                  <button
                    class="btn-cancel"
                    type="button"
                    (click)="goLogin()"
                  >
                    Cancel
                  </button>

                </div>

              </form>

            </div>

          </ng-container>

        </div>

      </div>

      <!-- Footer -->
      <div class="onls-footer">
        Copyright &copy; 2009 American Express Company
      </div>

    </div>
  `,

  styles: [`
    :host {
      display: block;
    }

    .onls-page {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: #fff;
      font-family: Arial, sans-serif;
      font-size: 13px;
    }

    /* Header */
    .onls-header {
      background: #fff;
      display: flex;
      align-items: center;
      padding: 4px 8px;
      min-height: 38px;
      border-bottom: 1px solid #d0d0d0;
    }

    .onls-header-left {
      display: flex;
      align-items: center;
    }

    .req-bar {
      background: #2d6bb5;
      color: #fff;
      font-size: 13px;
      font-weight: bold;
      padding: 4px 18px;
      letter-spacing: 1px;
    }

    .onls-rule {
      height: 2px;
      background: linear-gradient(
        to right,
        #b0c8e0,
        #dde8f0,
        #b0c8e0
      );
      border-top: 1px solid #bcd0e4;
    }

    /* Body */
    .onls-body {
      display: flex;
      flex: 1;
    }

    .onls-left-panel {
      display: none;
    }

    .onls-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 28px;
  padding-left: 140px;
}

    /* Title */
 .fp-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

    /* Form box */
 .fp-box {
  background: #dce8f5;
  border: 1px solid #d8d29c;
  padding: 10px;
  width: 290px;
  margin-top: 8px;
}

    /* Rows */
    .fp-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

    .fp-label {
  font-size: 11px;
  color: #333;
  width: 42px;
  margin-right: 8px;
}

    .req {
      color: red;
    }

    .fp-input {
  border: 1px solid #b7b7b7;
  padding: 1px 4px;
  font-size: 11px;
  height: 16px;
  width: 110px;
  background: #fff;
}
  .fp-box {
  margin-left: 170px;
}

    .fp-input:focus {
      border-color: #006fcf;
    }

    .fp-invalid {
      border-color: #cc0000 !important;
    }
      .fp-box {
  margin-top: 10px;
}

    /* Buttons */
    .fp-actions {
  display: flex;
  gap: 6px;
  margin-top: 10px;
}

    .btn-submit {
  background: #2d6bb5;
  color: #fff;
  border: 1px solid #1a5090;
  padding: 2px 8px;
  font-size: 10px;
  height: 20px;
}

    .btn-submit:hover {
      background: #1a5090;
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .btn-cancel {
  background: #e8edf2;
  color: #333;
  border: 1px solid #aaa;
  padding: 2px 8px;
  font-size: 10px;
  height: 20px;
}

    .btn-cancel:hover {
      background: #d0d8e4;
    }

    /* Alerts */
    .onls-alert {
      padding: 6px 10px;
      font-size: 12px;
      margin-bottom: 10px;
    }
 .onls-content {
  flex: 1;
  padding-top: 28px;
  padding-left: 140px;
}

    .onls-alert-error {
      background: #ffeaea;
      color: #cc0000;
      border: 1px solid #f5c6c6;
    }

    /* Success banner */
    .success-banner {
      background: #dff0d8;
      border: 1px solid #c3e6cb;
      color: #4f7f4f;
      padding: 12px;
      width: 260px;
      font-size: 11px;
      margin-bottom: 14px;
    }

    /* Footer */
    .onls-footer {
      border-top: 1px solid #ddd;
      padding: 5px 10px;
      font-size: 11px;
      color: #666;
      text-align: right;
    }
  `]
})

export class ForgotPasswordComponent {

  fpForm: FormGroup;

  loading = false;
  error = '';

  submitted = false;

  sentUserId = '';
  sentEmail = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
     private auth: AuthService
  ) {

    this.fpForm = this.fb.group({
      userId: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

  }

 onSubmit(): void {

  if (this.fpForm.invalid) {

    this.fpForm.markAllAsTouched();
    return;

  }

  this.loading = true;
  this.error = '';

  const userId = this.fpForm.value.userId;
  const email  = this.fpForm.value.email;

  this.auth.forgotPassword(userId, email)
    .subscribe({

      next: (res) => {

        this.loading = false;

        this.submitted = true;

        this.sentUserId = userId;
        this.sentEmail  = email;

        // Auto redirect after success
        setTimeout(() => {

          this.router.navigate(['/login']);

        }, 3000);

      },

      error: (err) => {

        this.loading = false;

        this.error =
          err?.error?.message ||
          'Unable to process forgot password request';

      }

    });

}

  goLogin(): void {
    this.router.navigate(['/login']);
  }

  get fc() {
    return this.fpForm.controls;
  }
}