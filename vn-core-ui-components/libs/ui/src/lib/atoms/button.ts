import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [disabled]="disabled" [ngClass]="['btn', 'btn-' + variant, 'btn-' + size]">
      {{ label }}
    </button>
  `,
  styles: [`
    .btn {
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-family: Arial, sans-serif;
      font-weight: 600;
    }
    .btn-primary { background-color: #1976d2; color: white; }
    .btn-secondary { background-color: #ff4081; color: white; }
    .btn-sm { padding: 4px 8px; font-size: 12px; }
    .btn-md { padding: 8px 16px; font-size: 14px; }
    .btn-lg { padding: 16px 24px; font-size: 16px; }
    button:disabled { opacity: 0.6; cursor: not-allowed; }
  `],
})
export class ButtonComponent {
  @Input() label = 'Button';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
}