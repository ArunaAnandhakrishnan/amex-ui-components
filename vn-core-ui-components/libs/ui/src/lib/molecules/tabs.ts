import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'ui-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="tabs">
      <div class="tabs-nav" role="tablist">
        <button *ngFor="let tab of tabs" role="tab"
          class="tab-btn" [class.active]="tab.id === activeTab" [disabled]="tab.disabled"
          [attr.aria-selected]="tab.id === activeTab"
          (click)="select(tab.id)">
          {{ tab.label }}
        </button>
      </div>
      <div class="tabs-content" role="tabpanel">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .tabs { font-family: Arial, sans-serif; }
    .tabs-nav { display: flex; border-bottom: 2px solid #e0e0e0; gap: 0; }
    .tab-btn {
      padding: 10px 20px; background: none; border: none;
      font-size: 14px; font-family: inherit; color: #666;
      cursor: pointer; border-bottom: 2px solid transparent;
      margin-bottom: -2px; transition: color 0.15s, border-color 0.15s;
    }
    .tab-btn:hover:not(:disabled) { color: #1976d2; }
    .tab-btn.active { color: #1976d2; border-bottom-color: #1976d2; font-weight: 600; }
    .tab-btn:disabled { opacity: 0.4; cursor: not-allowed; }
    .tabs-content { padding: 16px 0; font-size: 14px; color: #555; }
  `],
})
export class TabsComponent implements OnChanges {
  @Input() tabs: TabItem[] = [];
  @Input() activeTab = '';
  @Output() tabChange = new EventEmitter<string>();

  ngOnChanges() {
    if (!this.activeTab && this.tabs.length) this.activeTab = this.tabs[0].id;
  }

  select(id: string) {
    this.activeTab = id;
    this.tabChange.emit(id);
  }
}
