import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmexCardBadgeComponent, AmexCardType } from '../atoms/card-badge';

export interface AmexOffer {
  id: string;
  title: string;
  description: string;
  category: string;
  validUntil?: string;
  merchant?: string;
  eligibleCards?: AmexCardType[];
  enrolled?: boolean;
  imageUrl?: string;
}

@Component({
  selector: 'amex-offer-card',
  standalone: true,
  imports: [CommonModule, AmexCardBadgeComponent],
  template: `
    <div class="amex-offer" [class.amex-offer--enrolled]="offer.enrolled">
      <div class="amex-offer__header">
        <span class="amex-offer__category">{{ offer.category }}</span>
        <span *ngIf="offer.enrolled" class="amex-offer__enrolled-badge">✓ Enrolled</span>
      </div>

      <div class="amex-offer__body">
        <div *ngIf="offer.merchant" class="amex-offer__merchant">{{ offer.merchant }}</div>
        <h4 class="amex-offer__title">{{ offer.title }}</h4>
        <p class="amex-offer__desc">{{ offer.description }}</p>
      </div>

      <div class="amex-offer__footer">
        <div class="amex-offer__cards">
          <amex-card-badge
            *ngFor="let c of offer.eligibleCards"
            [type]="c">
          </amex-card-badge>
        </div>
        <div class="amex-offer__actions">
          <span *ngIf="offer.validUntil" class="amex-offer__expiry">Until {{ offer.validUntil }}</span>
          <button
            *ngIf="!offer.enrolled"
            class="amex-offer__enroll-btn"
            (click)="enroll.emit(offer)">
            Enroll
          </button>
          <button
            *ngIf="offer.enrolled"
            class="amex-offer__unenroll-btn"
            (click)="unenroll.emit(offer)">
            Unenroll
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .amex-offer {
      border: 1px solid #e0e0e0;
      border-radius: 10px;
      overflow: hidden;
      background: #fff;
      transition: box-shadow 0.15s;
    }
    .amex-offer:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.1); }
    .amex-offer--enrolled { border-color: #016FD0; }
    .amex-offer__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 14px;
      background: #f8f9fa;
      border-bottom: 1px solid #f0f0f0;
    }
    .amex-offer__category { font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.05em; }
    .amex-offer__enrolled-badge {
      font-size: 11px;
      font-weight: 600;
      color: #016FD0;
      background: #e3f0ff;
      padding: 2px 8px;
      border-radius: 10px;
    }
    .amex-offer__body { padding: 14px; }
    .amex-offer__merchant { font-size: 12px; color: #016FD0; font-weight: 600; margin-bottom: 4px; }
    .amex-offer__title { font-size: 15px; font-weight: 700; color: #111; margin: 0 0 6px; }
    .amex-offer__desc { font-size: 13px; color: #555; margin: 0; line-height: 1.5; }
    .amex-offer__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px;
      background: #fafafa;
      border-top: 1px solid #f0f0f0;
      gap: 10px;
    }
    .amex-offer__cards { display: flex; gap: 6px; flex-wrap: wrap; }
    .amex-offer__actions { display: flex; align-items: center; gap: 10px; }
    .amex-offer__expiry { font-size: 11px; color: #aaa; }
    .amex-offer__enroll-btn, .amex-offer__unenroll-btn {
      padding: 6px 14px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: opacity 0.1s;
    }
    .amex-offer__enroll-btn { background: #016FD0; color: #fff; }
    .amex-offer__enroll-btn:hover { opacity: 0.85; }
    .amex-offer__unenroll-btn { background: #f0f0f0; color: #555; }
    .amex-offer__unenroll-btn:hover { background: #e0e0e0; }
  `],
})
export class AmexOfferCardComponent {
  @Input() offer!: AmexOffer;
  @Output() enroll = new EventEmitter<AmexOffer>();
  @Output() unenroll = new EventEmitter<AmexOffer>();
}
