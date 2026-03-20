import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => InputComponent), multi: true }],
  template: `
    <div class="input-wrapper" [class.has-error]="error" [class.disabled]="disabled">
      <input
        [type]="type"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [value]="value"
        (input)="onInput($event)"
        (blur)="onTouched()"
        class="input"
      />
      <span *ngIf="error" class="input-error">{{ error }}</span>
    </div>
  `,
  styles: [`
    .input-wrapper { display: flex; flex-direction: column; gap: 4px; }
    .input {
      padding: 8px 12px;
      font-size: 14px;
      font-family: Arial, sans-serif;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      outline: none;
      transition: border-color 0.2s;
      width: 100%;
      box-sizing: border-box;
      color: #333;
      background: #fff;
    }
    .input:focus { border-color: #1976d2; box-shadow: 0 0 0 2px rgba(25,118,210,0.15); }
    .has-error .input { border-color: #f44336; }
    .has-error .input:focus { box-shadow: 0 0 0 2px rgba(244,67,54,0.15); }
    .disabled .input { background: #f5f5f5; cursor: not-allowed; color: #999; }
    .input-error { font-size: 12px; color: #f44336; }
  `],
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() error = '';

  value = '';
  onChange = (_: string) => {};
  onTouched = () => {};

  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
  }

  writeValue(val: string) { this.value = val ?? ''; }
  registerOnChange(fn: (_: string) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(disabled: boolean) { this.disabled = disabled; }
}
