import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AmexStatus =
  | 'approved'
  | 'rejected'
  | 'pending'
  | 'draft'
  | 'active'
  | 'inactive'
  | 'processing'
  | 'completed'
  | 'expired'
  | 'locked';

@Component({
  selector: 'amex-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [ngClass]="['amex-status', 'amex-status--' + status]">
      <span class="amex-status__dot"></span>
      {{ label || statusLabel }}
    </span>
  `,
  styles: [`
    .amex-status {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    .amex-status__dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .amex-status--approved   { background: #e8f5e9; color: #2e7d32; }
    .amex-status--approved .amex-status__dot   { background: #2e7d32; }
    .amex-status--rejected   { background: #ffebee; color: #c62828; }
    .amex-status--rejected .amex-status__dot   { background: #c62828; }
    .amex-status--pending    { background: #fff8e1; color: #f57f17; }
    .amex-status--pending .amex-status__dot    { background: #f57f17; }
    .amex-status--draft      { background: #f3f4f6; color: #6b7280; }
    .amex-status--draft .amex-status__dot      { background: #9ca3af; }
    .amex-status--active     { background: #e3f2fd; color: #1565c0; }
    .amex-status--active .amex-status__dot     { background: #1565c0; }
    .amex-status--inactive   { background: #f5f5f5; color: #757575; }
    .amex-status--inactive .amex-status__dot   { background: #9e9e9e; }
    .amex-status--processing { background: #e8eaf6; color: #3949ab; }
    .amex-status--processing .amex-status__dot { background: #3949ab; }
    .amex-status--completed  { background: #e0f2f1; color: #00695c; }
    .amex-status--completed .amex-status__dot  { background: #00695c; }
    .amex-status--expired    { background: #fce4ec; color: #880e4f; }
    .amex-status--expired .amex-status__dot    { background: #880e4f; }
    .amex-status--locked     { background: #efebe9; color: #4e342e; }
    .amex-status--locked .amex-status__dot     { background: #6d4c41; }
  `],
})
export class AmexStatusBadgeComponent {
  @Input() status: AmexStatus = 'pending';
  @Input() label = '';

  get statusLabel(): string {
    const map: Record<AmexStatus, string> = {
      approved: 'Approved',
      rejected: 'Rejected',
      pending: 'Pending',
      draft: 'Draft',
      active: 'Active',
      inactive: 'Inactive',
      processing: 'Processing',
      completed: 'Completed',
      expired: 'Expired',
      locked: 'Locked',
    };
    return map[this.status];
  }
}
