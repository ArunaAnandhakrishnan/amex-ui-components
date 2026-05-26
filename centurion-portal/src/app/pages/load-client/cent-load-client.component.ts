import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cent-load-client',
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="load-page">

      <h3>Load Client Data</h3>

      <input type="file" (change)="onFileChange($event)" />

      <button (click)="onSubmit()" class="submit-btn">Submit</button>

      <div class="success-msg" *ngIf="successMessage">{{ successMessage }}</div>
      <div class="error-msg"   *ngIf="errorMessage">{{ errorMessage }}</div>

    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .load-page   { padding: 20px 24px; }
    .submit-btn {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      color: #fff; border: 1px solid #005fba;
      padding: 8px 22px; font-size: 13px;
      cursor: pointer; border-radius: 3px;
      margin-top: 10px; display: block;
      font-family: Arial, sans-serif;
    }
    .submit-btn:hover { background: linear-gradient(to bottom, #4a92cf, #0058a6); }
    .success-msg { color: green;   font-size: 13px; margin-top: 10px; }
    .error-msg   { color: #cc0000; font-size: 13px; margin-top: 10px; font-weight: bold; }
  `],
})
export class CentLoadClientComponent {
  errorMessage   = '';
  successMessage = '';
  selectedFile: File | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file  = input.files?.[0] ?? null;
    if (file && !file.name.endsWith('.txt')) {
      this.errorMessage   = 'Please upload only .txt file';
      this.successMessage = '';
      this.selectedFile   = null;
      input.value         = '';
      return;
    }
    this.errorMessage = '';
    this.selectedFile = file;
  }

  onSubmit(): void {
    this.errorMessage   = '';
    this.successMessage = '';
    if (!this.selectedFile) { this.errorMessage = 'Please select a file.'; return; }
    if (!this.selectedFile.name.endsWith('.txt')) { this.errorMessage = 'Please upload only .txt file'; return; }
    this.successMessage = 'Client Data File Loaded Successfully.';
  }

  goBack(): void {
    this.router.navigate(['../home'], { relativeTo: this.route });
  }
}