import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="open" class="modal-backdrop" (click)="onBackdropClick($event)">
      <div class="modal modal-{{size}}" role="dialog" [attr.aria-label]="title">
        <div class="modal-header">
          <h2 class="modal-title">{{ title }}</h2>
          <button class="modal-close" (click)="closed.emit()" aria-label="Close">✕</button>
        </div>
        <div class="modal-body"><ng-content></ng-content></div>
        <div *ngIf="hasFooter" class="modal-footer"><ng-content select="[slot=footer]"></ng-content></div>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed; inset: 0; background: rgba(0,0,0,0.45);
      display: flex; align-items: center; justify-content: center;
      z-index: 1000; padding: 16px;
    }
    .modal {
      background: #fff; border-radius: 8px; width: 100%;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2); font-family: Arial, sans-serif;
      max-height: 90vh; display: flex; flex-direction: column;
    }
    .modal-sm { max-width: 400px; }
    .modal-md { max-width: 560px; }
    .modal-lg { max-width: 800px; }
    .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid #f0f0f0; }
    .modal-title { margin: 0; font-size: 18px; font-weight: 600; color: #333; }
    .modal-close { background: none; border: none; font-size: 18px; cursor: pointer; color: #888; padding: 0; }
    .modal-close:hover { color: #333; }
    .modal-body { padding: 20px; overflow-y: auto; flex: 1; font-size: 14px; color: #555; line-height: 1.6; }
    .modal-footer { padding: 12px 20px; border-top: 1px solid #f0f0f0; display: flex; justify-content: flex-end; gap: 8px; }
  `],
})
export class ModalComponent {
  @Input() open = false;
  @Input() title = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() closeOnBackdrop = true;
  @Input() hasFooter = false;
  @Output() closed = new EventEmitter<void>();

  onBackdropClick(e: MouseEvent) {
    if (this.closeOnBackdrop && (e.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closed.emit();
    }
  }
}
