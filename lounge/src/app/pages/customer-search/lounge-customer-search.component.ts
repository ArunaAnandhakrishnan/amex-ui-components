// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { LoungeService } from '../../core/services/lounge.service';
// import { LoungeCustomer } from '../../core/models/lounge.models';

// /**
//  * LoungeCustomerSearchComponent
//  * ─────────────────────────────────────────────────────────────
//  * Screen 1 — Customer Search
//  * Matches the ONLS Helper portal design from the functional spec.
//  *
//  * Layout: Navy header "PRIORITY PASS™ ENROLLMENT" → search field
//  * (Client Code) → SUBMIT → on result navigate to priority-pass screen.
//  * On no result or empty cards → show inline red error.
//  */
// @Component({
//   selector:    'app-lounge-customer-search',
//   standalone:  true,
//   imports:     [CommonModule, ReactiveFormsModule],
//   template: `
//     <div class="lcs">

//       <!-- ── Navy section header ── -->
//       <div class="lcs__header">PRIORITY PASS™ ENROLLMENT</div>

//       <div class="lcs__body">

//         <!-- ── Search form ── -->
//         <div class="lcs__section">
//           <div class="lcs__section-title">Customer Search</div>
//           <p class="lcs__hint">Enter the client code to search for an eligible customer.</p>

//           <form [formGroup]="searchForm" (ngSubmit)="onSearch()" novalidate>
//             <div class="lcs__field-row">
//               <label class="lcs__label" for="clientCode">Client Code</label>
//               <input
//                 id="clientCode"
//                 class="lcs__input"
//                 [class.lcs__input--invalid]="submitted && f['clientCode'].errors"
//                 formControlName="clientCode"
//                 placeholder="e.g. C123456"
//                 autocomplete="off"
//               />
//               <button
//                 class="lcs__submit-btn"
//                 type="submit"
//                 [disabled]="loading">
//                 {{ loading ? 'Searching...' : 'SUBMIT' }}
//               </button>
//             </div>

//             <!-- Inline validation -->
//             <div *ngIf="submitted && f['clientCode'].errors" class="lcs__field-error">
//               <span *ngIf="f['clientCode'].errors?.['required']">Client code is required.</span>
//             </div>
//           </form>
//         </div>

//         <!-- ── Error states ── -->
//         <div *ngIf="errorMsg" class="lcs__error-msg">
//           {{ errorMsg }}
//         </div>

//         <!-- ── Result preview (before navigating) ── -->
//         <ng-container *ngIf="customer">
//           <div class="lcs__result-panel">
//             <div class="lcs__section-title">Customer Found</div>
//             <dl class="lcs__detail-list">
//               <div class="lcs__detail-row">
//                 <dt class="lcs__dt">Name</dt>
//                 <dd class="lcs__dd">{{ customer.name }}</dd>
//               </div>
//               <div class="lcs__detail-row">
//                 <dt class="lcs__dt">Client Code</dt>
//                 <dd class="lcs__dd">{{ customer.clientCode }}</dd>
//               </div>
//               <div class="lcs__detail-row">
//                 <dt class="lcs__dt">Mobile</dt>
//                 <dd class="lcs__dd">{{ customer.mobile }}</dd>
//               </div>
//               <div class="lcs__detail-row">
//                 <dt class="lcs__dt">Email</dt>
//                 <dd class="lcs__dd">{{ customer.email }}</dd>
//               </div>
//               <div class="lcs__detail-row">
//                 <dt class="lcs__dt">Eligible Cards</dt>
//                 <dd class="lcs__dd">{{ customer.cards.length }}</dd>
//               </div>
//             </dl>

//             <div class="lcs__actions">
//               <button class="lcs__proceed-btn" (click)="proceedToEnrollment()">
//                 PROCEED TO ENROLLMENT →
//               </button>
//             </div>
//           </div>
//         </ng-container>

//       </div><!-- /body -->

//       <div class="lcs__copyright">Copyright © 2009 American Express Company</div>
//     </div>
//   `,
//   styles: [`
//     :host { display: block; font-family: Arial, sans-serif; font-size: 12px; }

//     .lcs { background: #fff; max-width: 700px; }

//     /* ── Navy header ── */
//     .lcs__header {
//       background: #1c3f72; color: #fff;
//       font-size: 15px; font-weight: bold;
//       padding: 12px 16px; letter-spacing: .03em;
//     }

//     .lcs__body { padding: 16px; }

//     /* ── Section ── */
//     .lcs__section       { margin-bottom: 20px; }
//     .lcs__section-title {
//       font-size: 13px; font-weight: bold; color: #006fcf;
//       border-bottom: 1px solid #b0cce0; padding-bottom: 4px; margin-bottom: 10px;
//     }
//     .lcs__hint { font-size: 12px; color: #555; margin-bottom: 10px; }

//     /* ── Field row ── */
//     .lcs__field-row {
//       display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
//     }
//     .lcs__label {
//       font-size: 12px; color: #333; min-width: 80px; font-weight: bold;
//     }
//     .lcs__input {
//       border: 1px solid #aaa; padding: 5px 8px;
//       font-size: 12px; font-family: Arial, sans-serif; width: 200px;
//     }
//     .lcs__input:focus   { outline: 1px solid #006fcf; border-color: #006fcf; }
//     .lcs__input--invalid { border-color: #cc0000; }
//     .lcs__field-error   { color: #cc0000; font-size: 11px; margin-top: 4px; }

//     /* ── Submit button ── */
//     .lcs__submit-btn {
//       background: #1c3f72; color: #fff; border: none;
//       padding: 6px 20px; font-size: 12px; font-weight: bold;
//       font-family: Arial, sans-serif; cursor: pointer;
//     }
//     .lcs__submit-btn:hover:not(:disabled) { background: #153060; }
//     .lcs__submit-btn:disabled { background: #888; cursor: not-allowed; }

//     /* ── Error message ── */
//     .lcs__error-msg {
//       color: #cc0000; font-size: 13px;
//       border: 1px solid #f5c6c6; background: #fff5f5;
//       padding: 10px 14px; margin-bottom: 12px;
//     }

//     /* ── Result panel ── */
//     .lcs__result-panel {
//       border: 1px solid #b0cce0; background: #f5faff;
//       padding: 14px; margin-top: 8px;
//     }
//     .lcs__detail-list { margin: 0; padding: 0; }
//     .lcs__detail-row  { display: flex; border-bottom: 1px solid #d0e4f0; }
//     .lcs__dt {
//       padding: 6px 12px; font-size: 12px; color: #333; font-weight: bold;
//       width: 120px; background: #e8f4fb; flex-shrink: 0;
//     }
//     .lcs__dd {
//       padding: 6px 12px; font-size: 12px; color: #1a1a1a; flex: 1;
//     }

//     /* ── Proceed button ── */
//     .lcs__actions    { margin-top: 14px; text-align: right; }
//     .lcs__proceed-btn {
//       background: #006fcf; color: #fff; border: none;
//       padding: 8px 24px; font-size: 12px; font-weight: bold;
//       font-family: Arial, sans-serif; cursor: pointer;
//     }
//     .lcs__proceed-btn:hover { background: #005baa; }

//     /* ── Copyright ── */
//     .lcs__copyright {
//       font-size: 11px; color: #888; text-align: right;
//       padding: 8px 16px; border-top: 1px solid #e0e0e0;
//     }
//   `],
// })
// export class LoungeCustomerSearchComponent {

//   searchForm: FormGroup;
//   submitted = false;
//   loading   = false;
//   errorMsg  = '';
//   customer: LoungeCustomer | null = null;

//   constructor(
//     private fb:      FormBuilder,
//     private router:  Router,
//     private loungeSvc: LoungeService,
//   ) {
//     this.searchForm = this.fb.group({
//       clientCode: ['', [Validators.required]],
//     });
//   }

//   get f() { return this.searchForm.controls; }

//   onSearch(): void {
//     this.submitted = true;
//     this.errorMsg  = '';
//     this.customer  = null;

//     if (this.searchForm.invalid) return;

//     this.loading = true;
//     const code   = this.f['clientCode'].value as string;

//     this.loungeSvc.searchCustomer(code).subscribe({
//       next: (result) => {
//         this.loading = false;
//         if (!result) {
//           this.errorMsg = `No eligible cards associated with the client code you entered or the client code does not exist.`;
//           return;
//         }
//         if (result.cards.length === 0) {
//           this.errorMsg = `No eligible cards associated with the client code you entered or the client code does not exist.`;
//           return;
//         }
//         this.customer = result;
//       },
//       error: () => {
//         this.loading  = false;
//         this.errorMsg = 'An unexpected error occurred. Please try again.';
//       },
//     });
//   }

//   proceedToEnrollment(): void {
//     if (this.customer) {
//       // Pass clientCode via router state so priority-pass screen can fetch it
//       this.router.navigate(['lounge', 'priority-pass'], {
//         state: { customer: this.customer },
//       });
//     }
//   }
// }
