import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LoungeService } from '../../core/services/lounge.service';
import { LoungeCustomer } from '../../core/models/lounge.models';

const COUNTRY_CODES = [
  { label: 'UAE (+971)', value: '+971' },
  { label: 'Bahrain (+973)', value: '+973' },
  { label: 'Saudi Arabia (+966)', value: '+966' },
  { label: 'Kuwait (+965)', value: '+965' },
  { label: 'Oman (+968)', value: '+968' },
  { label: 'Qatar (+974)', value: '+974' },
  { label: 'Egypt (+20)', value: '+20' },
  { label: 'Jordan (+962)', value: '+962' },
];

@Component({
  selector: 'app-lounge-priority-pass',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './lounge-priority-pass.component.html',
  styleUrls: ['./lounge-priority-pass.component.css'],
})
export class LoungePriorityPassComponent implements OnInit {

  searchForm: FormGroup;
  submitted = false;
  loading = false;
  errorMsg = '';

  customer: LoungeCustomer | null = null;
  selectedBasicCard = '';
  termsAccepted = false;
  enrollLoading = false;
  enrollSuccess = false;
  enrollSuccessMsg = '';
  enrollError = '';
  referenceId = '';

  editMode: 'mobile' | 'email' | null = null;
  editMobileCountry = '+971';
  editMobileNumber = '';
  editEmail = '';

  readonly countryCodes = COUNTRY_CODES;

  constructor(
    private fb: FormBuilder,
    private loungeSvc: LoungeService,
  ) {
    this.searchForm = this.fb.group({ clientCode: ['', Validators.required] });
  }

  get f() { return this.searchForm.controls; }

  ngOnInit(): void { }

  onSearch(): void {
    this.submitted = true;
    this.errorMsg = '';
    this.customer = null;
    if (this.searchForm.invalid) return;

    this.loading = true;
    const code = this.f['clientCode'].value as string;

    this.loungeSvc.searchCustomer(code).subscribe({
      next: (result) => {
        this.loading = false;
        if (!result || result.cards?.length === 0) {
          this.errorMsg = `No eligible cards associated with the client code you entered or the client code does not exist.`;
          return;
        }
        this.setCustomer(result);
      },
      error: () => {
        this.loading = false;
        this.errorMsg = 'An unexpected error occurred. Please try again.';
      },
    });
  }

  private setCustomer(c: LoungeCustomer): void {
    this.customer = { ...c, cards: c.cards.map(card => ({ ...card, selected: false })) };
    this.selectedBasicCard = this.customer.cards[0]?.cardNumber ?? '';
    const parts = c.mobile.split(' ');
    this.editMobileCountry = parts[0] ?? '+971';
    this.editMobileNumber = parts.slice(1).join(' ');
    this.editEmail = c.email;
  }

  get canEnroll(): boolean {
    return this.termsAccepted &&
      !!this.customer?.cards?.some(c => c.selected) &&
      !this.enrollSuccess;
  }

  get filteredCards() {
    if (!this.selectedBasicCard) {
      return this.customer?.cards || [];
    }

    return this.customer?.cards.filter(
      (card: any) => card.cardNumber === this.selectedBasicCard
    ) || [];
  }

  get uniqueCards(): string[] {
    return [...new Set(
      this.customer?.cards.map((card: any) => card.cardNumber)
    )];
  }

  toggleEdit(field: 'mobile' | 'email'): void {
    this.editMode = this.editMode === field ? null : field;
  }

  cancelEdit(): void { this.editMode = null; }

  submitMobile(): void {
    if (!this.customer) return;
    this.customer.mobile = `${this.editMobileCountry} ${this.editMobileNumber.trim()}`;
    this.editMode = null;
  }

  submitEmail(): void {
    if (!this.customer) return;
    this.customer.email = this.editEmail.trim();
    this.editMode = null;
  }

  onConfirmEnroll(): void {
    if (!this.customer || !this.canEnroll) return;
    this.enrollLoading = true;
    this.enrollError = '';

    const selectedCards = this.customer.cards.filter(c => c.selected);

    this.loungeSvc.enrollPriorityPass({
      clientCode: this.customer.clientCode,
      selectedCards,
      termsAccepted: this.termsAccepted,
    }).subscribe({
      next: (result) => {
        this.enrollLoading = false;
        this.enrollSuccess = true;
        this.enrollSuccessMsg = result.message;
        this.referenceId = result.referenceId ?? '';
        selectedCards.forEach(sc => {
          const card = this.customer!.cards.find(c => c.cardNumber === sc.cardNumber);
          if (card) card.enrolled = true;
        });
      },
      error: (err: Error) => {
        this.enrollLoading = false;
        this.enrollError = err.message || 'Enrollment failed. Please try again.';
      },
    });
  }
}