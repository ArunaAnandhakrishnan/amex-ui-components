import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'amex-amount',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="amex-amount" [class.amex-amount--debit]="type === 'debit'" [class.amex-amount--credit]="type === 'credit'">
      <span class="amex-amount__currency">{{ currency }}</span>
      <span class="amex-amount__value">{{ formattedAmount }}</span>
      <span *ngIf="type === 'credit'" class="amex-amount__cr">CR</span>
    </span>
  `,
  styles: [`
    .amex-amount {
      display: inline-flex;
      align-items: baseline;
      gap: 3px;
      font-weight: 500;
    }
    .amex-amount__currency {
      font-size: 11px;
      color: #777;
      letter-spacing: 0.04em;
    }
    .amex-amount__value { font-size: 14px; color: #111; }
    .amex-amount--debit .amex-amount__value  { color: #c62828; }
    .amex-amount--credit .amex-amount__value { color: #2e7d32; }
    .amex-amount__cr {
      font-size: 10px;
      font-weight: 700;
      color: #2e7d32;
      letter-spacing: 0.05em;
    }
  `],
})
export class AmexAmountComponent {
  @Input() amount = 0;
  @Input() currency = 'AED';
  @Input() type: 'debit' | 'credit' | 'neutral' = 'neutral';
  @Input() decimals = 2;

  get formattedAmount(): string {
    return this.amount.toLocaleString('en-US', {
      minimumFractionDigits: this.decimals,
      maximumFractionDigits: this.decimals,
    });
  }
}
