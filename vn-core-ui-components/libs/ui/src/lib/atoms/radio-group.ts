import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface RadioOption {
  label: string;
  value: string | number;
}

@Component({
  selector: 'ui-radio-group',
  standalone: true,
  imports: [CommonModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => RadioGroupComponent), multi: true }],
  template: `
    <div class="radio-group" [class.horizontal]="orientation === 'horizontal'">
      <label *ngFor="let opt of options" class="radio-label" [class.disabled]="disabled">
        <input
          type="radio"
          [name]="name"
          [value]="opt.value"
          [checked]="opt.value === value"
          [disabled]="disabled"
          (change)="onSelect(opt.value)"
          (blur)="onTouched()"
          class="radio-input"
        />
        <span class="radio-circle"></span>
        <span class="radio-text">{{ opt.label }}</span>
      </label>
    </div>
  `,
  styles: [`
    .radio-group { display: flex; flex-direction: column; gap: 8px; }
    .radio-group.horizontal { flex-direction: row; flex-wrap: wrap; gap: 16px; }
    .radio-label {
      display: inline-flex; align-items: center; gap: 8px;
      cursor: pointer; font-size: 14px; font-family: Arial, sans-serif;
      color: #333; user-select: none;
    }
    .radio-input { display: none; }
    .radio-circle {
      width: 18px; height: 18px;
      border: 2px solid #e0e0e0;
      border-radius: 50%;
      background: #fff;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s; flex-shrink: 0;
    }
    .radio-input:checked + .radio-circle {
      border-color: #1976d2;
    }
    .radio-input:checked + .radio-circle::after {
      content: '';
      width: 8px; height: 8px;
      border-radius: 50%;
      background: #1976d2;
      display: block;
    }
    .disabled { cursor: not-allowed; opacity: 0.6; }
  `],
})
export class RadioGroupComponent implements ControlValueAccessor {
  @Input() options: RadioOption[] = [];
  @Input() name = 'radio-group';
  @Input() orientation: 'vertical' | 'horizontal' = 'vertical';
  @Input() disabled = false;

  value: string | number = '';
  onChange = (_: string | number) => {};
  onTouched = () => {};

  onSelect(val: string | number) {
    this.value = val;
    this.onChange(val);
  }

  writeValue(val: string | number) { this.value = val ?? ''; }
  registerOnChange(fn: (_: string | number) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(disabled: boolean) { this.disabled = disabled; }
}
