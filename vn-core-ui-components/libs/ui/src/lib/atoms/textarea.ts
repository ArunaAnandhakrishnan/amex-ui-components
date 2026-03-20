import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-textarea',
  standalone: true,
  imports: [CommonModule],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => TextareaComponent), multi: true }],
  template: `
    <div class="textarea-wrapper" [class.has-error]="error" [class.disabled]="disabled">
      <textarea
        [placeholder]="placeholder"
        [disabled]="disabled"
        [rows]="rows"
        (input)="onInput($event)"
        (blur)="onTouched()"
        class="textarea"
      >{{ value }}</textarea>
      <span *ngIf="error" class="textarea-error">{{ error }}</span>
    </div>
  `,
  styles: [`
    .textarea-wrapper { display: flex; flex-direction: column; gap: 4px; }
    .textarea {
      padding: 8px 12px;
      font-size: 14px;
      font-family: Arial, sans-serif;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      outline: none;
      resize: vertical;
      transition: border-color 0.2s;
      width: 100%;
      box-sizing: border-box;
      color: #333;
    }
    .textarea:focus { border-color: #1976d2; box-shadow: 0 0 0 2px rgba(25,118,210,0.15); }
    .has-error .textarea { border-color: #f44336; }
    .disabled .textarea { background: #f5f5f5; cursor: not-allowed; color: #999; }
    .textarea-error { font-size: 12px; color: #f44336; }
  `],
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() rows = 4;
  @Input() error = '';

  value = '';
  onChange = (_: string) => {};
  onTouched = () => {};

  onInput(event: Event) {
    this.value = (event.target as HTMLTextAreaElement).value;
    this.onChange(this.value);
  }

  writeValue(val: string) { this.value = val ?? ''; }
  registerOnChange(fn: (_: string) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }
  setDisabledState(disabled: boolean) { this.disabled = disabled; }
}
