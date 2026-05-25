import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CenLcyExcService } from '../../core/services/cen-lcy-exc.service';
import { CenCustomer } from '../../core/models/cen-lcy-exc.models';

@Component({
  selector: 'app-cen-lcy-exc',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './cen-lcy-exc.component.html',
  styleUrls: ['./cen-lcy-exc.component.css'],
})
export class CenLcyExcComponent implements OnInit {

  // ── Search ──────────────────────────────────────────────────────────────────
  searchForm!: FormGroup;
  submitted   = false;
  searching   = false;
  searchError = '';

  // ── Already submitted (shown only when user tries to resubmit) ───────────────
  alreadySubmittedMsg = '';

  // ── Customer / Result ───────────────────────────────────────────────────────
  customer: CenCustomer | null = null;

  // ── Application submission ───────────────────────────────────────────────────
  termsAccepted  = false;
  submitting     = false;
  submitSuccess  = false;
  successMessage = '';
  submitError    = '';

  constructor(
    private fb:  FormBuilder,
    private svc: CenLcyExcService,
  ) {}

  get f() { return this.searchForm.controls; }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      clientId: ['', Validators.required],
    });
  }

  // ── Search ───────────────────────────────────────────────────────────────────
  onSearch(): void {
    this.submitted           = true;
    this.searchError         = '';
    this.alreadySubmittedMsg = '';   // clear on every fresh search attempt
    this.customer            = null;
    this.submitSuccess       = false;
    this.submitError         = '';
    this.termsAccepted       = false;

    if (this.searchForm.invalid) return;

    const clientId = this.f['clientId'].value as string;

    // Check for already-submitted application — show error, don't proceed
    const existing = this.svc.getExistingApplication(clientId);
    if (existing) {
      this.alreadySubmittedMsg =
        `Application number ${existing} has already been generated for the given client id.`;
      return;
    }

    this.searching = true;

    this.svc.getCustomer(clientId).subscribe({
      next: (result) => {
        this.searching = false;
        if (!result) {
          this.searchError = 'No customer found for the given Client ID.';
          return;
        }
        this.customer = result;
      },
      error: () => {
        this.searching = false;
        this.searchError = 'An unexpected error occurred. Please try again.';
      },
    });
  }

  // ── Submit Application ────────────────────────────────────────────────────────
  onSubmitApplication(): void {
    if (!this.customer || !this.termsAccepted) return;

    this.submitting  = true;
    this.submitError = '';

    this.svc.submitApplication({
      clientId:      this.customer.clientId,
      termsAccepted: this.termsAccepted,
    }).subscribe({
      next: (result) => {
        this.submitting     = false;
        this.submitSuccess  = true;
        this.successMessage = result.message;
      },
      error: (err: Error) => {
        this.submitting  = false;
        this.submitError = err.message || 'Submission failed. Please try again.';
      },
    });
  }

  // ── Ok button (after success) — clean reset, NO already-submitted banner ──────
  onOk(): void {
    this.customer            = null;
    this.submitSuccess       = false;
    this.successMessage      = '';
    this.submitted           = false;
    this.alreadySubmittedMsg = '';   // ← clear — banner shows only on re-search
    this.searchError         = '';
    this.termsAccepted       = false;
    this.searchForm.reset();
  }
}
