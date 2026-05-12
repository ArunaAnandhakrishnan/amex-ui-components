import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

type Step = 'search' | 'cards' | 'issue' | 'done';

interface CardInfo { cardNumber: string; cardType: string; status: string; }
interface WearableProduct { name: string; color: string; icon: string; }

const API_BASE = 'http://localhost:8080/api';

@Component({
  selector: 'app-wearables',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="wp">

      <!-- ═══ STEP 1 & 2: Enter Client Number + Card Selection ═══ -->
      <ng-container *ngIf="step === 'search' || step === 'cards'">

        <!-- Enter Client Number -->
        <div class="wp__section">
          <div class="wp__title">Enter Client Number</div>
          <div class="wp__divider"></div>
          <div class="wp__input-row">
            <input class="wp__input" [(ngModel)]="clientCode"
                   placeholder="eg. 12345" (keyup.enter)="onEnterClient()" />
            <button class="wp__enter-btn"
                    [class.wp__enter-btn--filled]="clientCode.trim()"
                    (click)="onEnterClient()">Enter</button>
          </div>
        </div>

        <ng-container *ngIf="step === 'cards'">

          <!-- Please Select Basic Card -->
          <div class="wp__section">
            <div class="wp__title">Please Select Basic Card</div>
            <div class="wp__divider"></div>
            <select class="wp__select" [(ngModel)]="selectedCard">
              <option [ngValue]="null" disabled>-- Select a Card --</option>
              <option *ngFor="let c of cards" [ngValue]="c">
                {{ c.cardNumber }} - {{ c.cardType }}
              </option>
            </select>
          </div>

          <!-- Card Selection art -->
          <div class="wp__section" *ngIf="selectedCard">
            <div class="wp__title">Card Selection</div>
            <div class="wp__divider"></div>
            <div class="wp__card-art-row">
              <div class="wp__card-art">
                <div class="wp__card-logo-box">
                  <span class="wp__card-logo-am">AMERICAN</span>
                  <span class="wp__card-logo-ex">EXPRESS</span>
                </div>
                <div class="wp__card-art__number">{{ selectedCard.cardNumber }}</div>
                <div class="wp__card-art__type">{{ selectedCard.cardType }}</div>
              </div>
              <div class="wp__card-masked">{{ selectedCard.cardNumber }}</div>
            </div>
          </div>

          <!-- Apply row -->
          <div class="wp__apply-row">
            <span class="wp__apply-text">Want to apply for a new wearable?</span>
            <button class="wp__apply-btn" (click)="onApply()">Apply</button>
          </div>

        </ng-container>
      </ng-container>

      <!-- ═══ STEP 3: Select Amex Wearable ═══ -->
      <ng-container *ngIf="step === 'issue'">

        <div class="wp__section">
          <div class="wp__title">Select Amex Wearable</div>
          <div class="wp__divider"></div>
        </div>

        <!-- Type icon tabs -->
        <div class="wp__type-tabs">
          <div *ngFor="let t of wearableTypes"
               class="wp__type-tab"
               [class.wp__type-tab--active]="selectedWearableType === t.id"
               (click)="selectType(t.id)">
            <div class="wp__type-icon" [innerHTML]="t.svg"></div>
            <span class="wp__type-label">{{ t.label }}</span>
          </div>
        </div>

        <!-- Product carousel card -->
        <div class="wp__product-card" *ngIf="currentProduct">
          <div class="wp__product-card__top">
            <span class="wp__product-link">
              The American Express {{ selectedCard?.cardType }} Credit Card
              - Card Ending {{ selectedCard?.cardNumber | slice:-4 }}
            </span>
            <button class="wp__faq-btn">?</button>
          </div>
          <div class="wp__product-name">{{ currentProduct.name }}</div>
          <div class="wp__carousel">
            <button class="wp__carousel-arrow"
                    (click)="prevProduct()"
                    [disabled]="selectedWearableIndex === 0">&#8592;</button>
            <div class="wp__product-img-area">
              <span class="wp__product-img-icon">{{ currentProduct.icon }}</span>
            </div>
            <button class="wp__carousel-arrow"
                    (click)="nextProduct()"
                    [disabled]="selectedWearableIndex >= currentProducts.length - 1">&#8594;</button>
          </div>
        </div>

        <!-- T&C + Submit -->
        <div class="wp__tc-area">
          <p class="wp__tc-notice">
            Please make sure you are happy with your selection before submitting.
            Your Wearable selection cannot be edited after submission.
          </p>
          <div class="wp__tc-row">
            <input type="checkbox" id="wptc" [(ngModel)]="tcAccepted" />
            <label for="wptc">
              I accept the <span class="wp__tc-link">Terms &amp; Conditions</span>
            </label>
          </div>
          <button class="wp__submit-btn" [disabled]="!tcAccepted || submitting"
                  (click)="onSubmit()">
            {{ submitting ? 'Submitting...' : 'Submit' }}
          </button>
          <div class="wp__back-row">
            <button class="wp__back-link" (click)="step = 'cards'">&#8592; Back to Card Selection</button>
          </div>
        </div>

      </ng-container>

      <!-- ═══ STEP 4: YOUR AMEX WEARABLES ═══ -->
      <ng-container *ngIf="step === 'done' && issuedDevice">

        <!-- Client Number still at top -->
        <div class="wp__section">
          <div class="wp__title">Enter Client Number</div>
          <div class="wp__divider"></div>
          <div class="wp__input-row">
            <input class="wp__input" [(ngModel)]="clientCode" />
            <button class="wp__enter-btn wp__enter-btn--filled" (click)="onEnterClient()">Enter</button>
          </div>
        </div>

        <!-- Summary -->
        <div class="wp__summary">
          <div class="wp__summary-title">YOUR AMEX WEARABLES</div>
          <table class="wp__summary-table">
            <tr>
              <td class="wp__sl">Selected Card UCI</td>
              <td class="wp__sv">{{ issuedDevice.selectedCardUci }}</td>
            </tr>
            <tr>
              <td class="wp__sl">Wearable UCI</td>
              <td class="wp__sv">{{ issuedDevice.wearableUci }}</td>
            </tr>
            <tr>
              <td class="wp__sl">Wearable Type</td>
              <td class="wp__sv">{{ issuedDevice.wearableType }}</td>
            </tr>
            <tr>
              <td class="wp__sl">Color Selected</td>
              <td class="wp__sv">{{ issuedDevice.colorSelected }}</td>
            </tr>
            <tr>
              <td class="wp__sl">Wearable Name</td>
              <td class="wp__sv">{{ issuedDevice.wearableName }}</td>
            </tr>
            <tr>
              <td class="wp__sl">Order Date</td>
              <td class="wp__sv">{{ issuedDevice.orderDate }}</td>
            </tr>
          </table>
          <div class="wp__summary-img-row">
            <span class="wp__summary-icon">{{ issuedDevice.icon }}</span>
          </div>
        </div>

        <div style="padding: 12px 0;">
          <button class="wp__back-link" (click)="reset()">Search Another Client</button>
        </div>
      </ng-container>

    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; background: #fff; }

    .wp { background: #fff; padding: 20px 24px; min-height: 400px; }

    /* ── Section ── */
    .wp__section { margin-bottom: 24px; }
    .wp__title {
      font-size: 22px; font-weight: normal; color: #1a1a1a; margin-bottom: 8px;
    }
    .wp__divider {
      height: 2px; background: #1a6cb8; margin-bottom: 16px;
    }

    /* ── Input row ── */
    .wp__input-row { display: flex; align-items: stretch; }
    .wp__input {
      border: 1px solid #ccc; border-right: none;
      padding: 8px 12px; font-size: 14px; font-family: Arial, sans-serif;
      width: 340px; outline: none; box-sizing: border-box;
    }
    .wp__input:focus { border-color: #1a6cb8; }
    .wp__enter-btn {
      padding: 8px 24px; font-size: 14px; font-family: Arial, sans-serif;
      cursor: pointer; border: 1px solid #ccc; background: #f5f5f5; color: #777;
      white-space: nowrap;
    }
    .wp__enter-btn--filled {
      background: #1a6cb8; color: #fff; border-color: #1a6cb8;
    }
    .wp__enter-btn--filled:hover { background: #155a9e; }

    /* ── Card dropdown ── */
    .wp__select {
      border: 1px solid #ccc; padding: 7px 10px; font-size: 14px;
      font-family: Arial, sans-serif; width: 420px; outline: none;
      background: #fff; cursor: pointer;
    }

    /* ── Card art ── */
    .wp__card-art-row { display: flex; flex-direction: column; gap: 8px; }
    .wp__card-art {
      width: 210px; height: 130px;
      background: linear-gradient(135deg, #c8a030, #e8c840, #b08020);
      border-radius: 8px; padding: 14px; position: relative;
      display: flex; flex-direction: column; justify-content: space-between;
    }
    .wp__card-logo-box {
      background: #006fcf; width: 50px; height: 36px; border-radius: 4px;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center; padding: 2px;
    }
    .wp__card-logo-am {
      color: #fff; font-size: 5.5px; font-weight: 900; letter-spacing: 0.5px;
    }
    .wp__card-logo-ex {
      color: #fff; font-size: 9px; font-weight: 900; letter-spacing: 0.5px;
    }
    .wp__card-art__number { font-size: 11px; color: #fff; font-family: monospace; letter-spacing: 1px; }
    .wp__card-art__type { font-size: 10px; color: rgba(255,255,255,0.85); }
    .wp__card-masked { font-size: 14px; color: #333; font-family: monospace; letter-spacing: 1px; }

    /* ── Apply row ── */
    .wp__apply-row {
      display: flex; align-items: center; gap: 14px;
      margin-top: 4px; padding: 6px 0;
    }
    .wp__apply-text { font-size: 14px; color: #222; }
    .wp__apply-btn {
      background: #1a6cb8; color: #fff; border: none;
      padding: 7px 26px; font-size: 14px; font-family: Arial, sans-serif;
      cursor: pointer; border-radius: 2px;
    }
    .wp__apply-btn:hover { background: #155a9e; }

    /* ── Wearable type tabs ── */
    .wp__type-tabs {
      display: flex; gap: 40px; padding: 10px 0 0;
      border-bottom: 1px solid #e0e0e0; margin-bottom: 20px;
    }
    .wp__type-tab {
      display: flex; flex-direction: column; align-items: center; gap: 6px;
      cursor: pointer; padding-bottom: 12px;
      border-bottom: 3px solid transparent; color: #666;
      min-width: 64px; transition: color 0.15s, border-color 0.15s;
    }
    .wp__type-tab:hover { color: #1a6cb8; }
    .wp__type-tab--active { color: #1a6cb8; border-bottom-color: #1a6cb8; }
    .wp__type-icon { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; }
    .wp__type-label { font-size: 13px; font-weight: bold; }

    /* ── Product card ── */
    .wp__product-card {
      border: 1px solid #ddd; padding: 18px 20px; max-width: 580px;
      margin-bottom: 24px;
    }
    .wp__product-card__top {
      display: flex; justify-content: space-between; align-items: flex-start;
      margin-bottom: 8px;
    }
    .wp__product-link { color: #006fcf; font-size: 13px; cursor: pointer; }
    .wp__faq-btn {
      background: none; border: 2px solid #006fcf; color: #006fcf;
      width: 26px; height: 26px; border-radius: 50%; cursor: pointer;
      font-size: 14px; font-weight: bold; line-height: 1;
      display: flex; align-items: center; justify-content: center; padding: 0;
      flex-shrink: 0;
    }
    .wp__product-name { font-size: 16px; font-weight: bold; color: #1a1a1a; margin-bottom: 14px; }
    .wp__carousel {
      display: flex; align-items: center; gap: 10px;
      justify-content: space-between; min-height: 180px;
    }
    .wp__carousel-arrow {
      background: #f0f0f0; border: 1px solid #bbb;
      width: 38px; height: 38px; cursor: pointer; font-size: 18px;
      display: flex; align-items: center; justify-content: center;
      border-radius: 2px; flex-shrink: 0;
    }
    .wp__carousel-arrow:disabled { opacity: 0.3; cursor: not-allowed; }
    .wp__carousel-arrow:not(:disabled):hover { background: #e0e0e0; }
    .wp__product-img-area {
      flex: 1; display: flex; align-items: center; justify-content: center;
      min-height: 160px;
    }
    .wp__product-img-icon { font-size: 90px; }

    /* ── T&C ── */
    .wp__tc-area { max-width: 560px; }
    .wp__tc-notice { font-size: 12px; color: #555; line-height: 1.6; margin-bottom: 12px; }
    .wp__tc-row { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; font-size: 13px; }
    .wp__tc-link { color: #006fcf; text-decoration: underline; cursor: pointer; }
    .wp__submit-btn {
      width: 100%; max-width: 360px; display: block;
      background: #1a3a6b; color: #fff; border: none;
      padding: 12px 0; font-size: 15px; font-weight: bold;
      cursor: pointer; font-family: Arial, sans-serif; margin-bottom: 12px;
    }
    .wp__submit-btn:hover:not(:disabled) { background: #16304f; }
    .wp__submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .wp__back-row { margin-top: 6px; }
    .wp__back-link {
      background: none; border: none; color: #006fcf;
      font-size: 13px; cursor: pointer; text-decoration: underline;
      font-family: Arial, sans-serif; padding: 0;
    }

    /* ── Summary ── */
    .wp__summary { padding: 8px 0 16px; }
    .wp__summary-title {
      font-size: 16px; font-weight: bold; color: #1a1a1a;
      text-align: center; margin-bottom: 18px;
    }
    .wp__summary-table { border-collapse: collapse; margin-bottom: 16px; }
    .wp__sl {
      padding: 8px 24px 8px 0; font-size: 13px;
      font-weight: bold; color: #333; white-space: nowrap; vertical-align: top;
    }
    .wp__sv { padding: 8px 0; font-size: 13px; color: #006fcf; }
    .wp__summary-img-row { display: flex; justify-content: flex-start; margin-top: 10px; }
    .wp__summary-icon { font-size: 90px; }
  `],
})
export class WearablesComponent implements OnInit {

  @Input() showPageHeader = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void { this.checkBackendHealth(); }

  step: Step = 'search';
  apiOnline: boolean | null = null;
  clientCode = '';
  memberName = '';
  cards: CardInfo[] = [];
  selectedCard: CardInfo | null = null;
  submitting = false;
  selectedWearableType = 'bracelet';
  selectedWearableIndex = 0;
  tcAccepted = false;
  issuedDevice: any = null;

  wearableTypes = [
    {
      id: 'bracelet', label: 'Bracelet',
      svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 28C10.477 28 6 23.523 6 18V14C6 8.477 10.477 4 16 4C21.523 4 26 8.477 26 14V18C26 23.523 21.523 28 16 28Z" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M10 14C10 11.239 12.686 9 16 9C19.314 9 22 11.239 22 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
        <path d="M10 18C10 20.761 12.686 23 16 23C19.314 23 22 20.761 22 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>
      </svg>`
    },
    {
      id: 'band', label: 'Band',
      svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="2" width="8" height="9" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
        <rect x="10" y="10" width="12" height="12" rx="1" stroke="currentColor" stroke-width="2" fill="none"/>
        <rect x="12" y="21" width="8" height="9" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
        <line x1="13.5" y1="14.5" x2="18.5" y2="14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="13.5" y1="17.5" x2="18.5" y2="17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>`
    },
    {
      id: 'ring', label: 'Ring',
      svg: `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 22V17C6 11.477 10.477 7 16 7C21.523 7 26 11.477 26 17V22" stroke="currentColor" stroke-width="2" fill="none"/>
        <ellipse cx="16" cy="22" rx="10" ry="4.5" stroke="currentColor" stroke-width="2" fill="none"/>
        <ellipse cx="16" cy="17" rx="4" ry="2" stroke="currentColor" stroke-width="1.5" fill="none"/>
      </svg>`
    },
  ];

  wearableProducts: Record<string, WearableProduct[]> = {
    bracelet: [
      { name: 'Amex Leather Bracelet',  color: 'Leather Bracelet', icon: '🟤' },
      { name: 'Amex Sport Bracelet',    color: 'Black',            icon: '⚫' },
    ],
    band: [
      { name: 'Amex Sport Band',        color: 'Black',            icon: '⌚' },
      { name: 'Amex Silicone Band',     color: 'Navy Blue',        icon: '🔵' },
    ],
    ring: [
      { name: 'Amex Ceramic Ring',      color: 'White',            icon: '💍' },
      { name: 'Amex Titanium Ring',     color: 'Silver',           icon: '🩶' },
    ],
  };

  get currentProducts(): WearableProduct[] {
    return this.wearableProducts[this.selectedWearableType] ?? [];
  }

  get currentProduct(): WearableProduct | null {
    return this.currentProducts[this.selectedWearableIndex] ?? null;
  }

  private checkBackendHealth(): void {
    this.http.get<any>(`${API_BASE}/health`).subscribe({
      next: () => { this.apiOnline = true; },
      error: () => { this.apiOnline = false; },
    });
  }

  onEnterClient(): void {
    if (!this.clientCode.trim()) return;
    this.http.get<any>(`${API_BASE}/wearables/client/${this.clientCode.trim()}`).subscribe({
      next: (res) => {
        // ✅ FIX: Backend wraps response in ApiResponse<T> → res.data has the actual payload
        this.memberName  = res.data?.memberName ?? 'Unknown Member';
        this.cards       = res.data?.cards ?? [];
        this.selectedCard = this.cards[0] ?? null;
        this.step = 'cards';
      },
      error: () => {
        // Mock fallback when backend offline
        this.memberName = 'John Doe';
        this.cards = [
          { cardNumber: '3744 XXXXXX 9008', cardType: 'Centurion', status: 'Active'   },
          { cardNumber: '3782 XXXXXX 0005', cardType: 'Platinum',  status: 'Active'   },
          { cardNumber: '3711 XXXXXX 1234', cardType: 'Gold',      status: 'Inactive' },
        ];
        this.selectedCard = this.cards[0];
        this.step = 'cards';
      },
    });
  }

  onApply(): void {
    if (!this.selectedCard) return;
    this.selectedWearableType  = 'bracelet';
    this.selectedWearableIndex = 0;
    this.tcAccepted = false;
    this.step = 'issue';
  }

  selectType(id: string): void {
    this.selectedWearableType  = id;
    this.selectedWearableIndex = 0;
  }

  prevProduct(): void { if (this.selectedWearableIndex > 0) this.selectedWearableIndex--; }
  nextProduct(): void {
    if (this.selectedWearableIndex < this.currentProducts.length - 1) this.selectedWearableIndex++;
  }

  onSubmit(): void {
    if (!this.tcAccepted || !this.currentProduct || !this.selectedCard) return;
    this.submitting = true;

    const payload = {
      clientCode:    this.clientCode,
      selectedCard:  this.selectedCard.cardNumber,
      wearableType:  this.selectedWearableType,
      colorSelected: this.currentProduct.color,
      wearableName:  this.currentProduct.name,
      tcAccepted:    true,
    };

    this.http.post<any>(`${API_BASE}/wearables/issue`, payload).subscribe({
      next: (res) => {
        // ✅ FIX: ApiResponse<WearableDevice> → res.data has WearableDevice fields
        const d = res.data;
        this.issuedDevice = {
          selectedCardUci: this.selectedCard?.cardNumber ?? '',
          wearableUci:     d?.serialNo   ?? '',
          wearableType:    d?.deviceType ?? '',
          colorSelected:   this.currentProduct?.color ?? '',
          wearableName:    this.currentProduct?.name  ?? '',
          orderDate:       d?.issueDate  ?? new Date().toLocaleDateString('en-GB'),
          icon:            this.currentProduct?.icon  ?? '',
        };
        this.submitting = false;
        this.step = 'done';
      },
      error: () => {
        // Mock fallback
        this.issuedDevice = {
          selectedCardUci: this.selectedCard?.cardNumber ?? '',
          wearableUci:     'SN-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
          wearableType:    this.selectedWearableType.charAt(0).toUpperCase() + this.selectedWearableType.slice(1),
          colorSelected:   this.currentProduct?.color ?? '',
          wearableName:    this.currentProduct?.name  ?? '',
          orderDate:       new Date().toLocaleDateString('en-GB'),
          icon:            this.currentProduct?.icon  ?? '',
        };
        this.submitting = false;
        this.step = 'done';
      },
    });
  }

  reset(): void {
    this.step = 'search'; this.clientCode = ''; this.memberName = '';
    this.cards = []; this.selectedCard = null; this.issuedDevice = null;
    this.tcAccepted = false; this.submitting = false;
    this.selectedWearableType = 'bracelet'; this.selectedWearableIndex = 0;
  }
}