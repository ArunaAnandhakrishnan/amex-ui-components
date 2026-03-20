import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

@Component({
  selector: 'ui-accordion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="accordion">
      <div *ngFor="let item of items" class="accordion-item" [class.open]="isOpen(item.id)">
        <button class="accordion-header" (click)="toggle(item.id)" [attr.aria-expanded]="isOpen(item.id)">
          <span>{{ item.title }}</span>
          <span class="accordion-icon">{{ isOpen(item.id) ? '▲' : '▼' }}</span>
        </button>
        <div class="accordion-body" *ngIf="isOpen(item.id)">
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .accordion { font-family: Arial, sans-serif; border: 1px solid #e0e0e0; border-radius: 6px; overflow: hidden; }
    .accordion-item { border-bottom: 1px solid #e0e0e0; }
    .accordion-item:last-child { border-bottom: none; }
    .accordion-header {
      width: 100%; display: flex; justify-content: space-between; align-items: center;
      padding: 14px 16px; background: #fff; border: none; cursor: pointer;
      font-size: 14px; font-weight: 600; color: #333; text-align: left;
      transition: background 0.15s;
    }
    .accordion-header:hover { background: #f9f9f9; }
    .accordion-item.open .accordion-header { background: #f5f9ff; color: #1976d2; }
    .accordion-icon { font-size: 11px; color: #888; }
    .accordion-body { padding: 12px 16px 16px; font-size: 14px; color: #555; line-height: 1.6; background: #fff; }
  `],
})
export class AccordionComponent {
  @Input() items: AccordionItem[] = [];
  @Input() multiple = false;

  openIds = new Set<string>();

  isOpen(id: string) { return this.openIds.has(id); }

  toggle(id: string) {
    if (this.openIds.has(id)) {
      this.openIds.delete(id);
    } else {
      if (!this.multiple) this.openIds.clear();
      this.openIds.add(id);
    }
  }
}
