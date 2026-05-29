import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-new-outlet-portal',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl:
    './new-outlet-portal.component.html',

  styles: [`

    .portal-container {

      width: 100%;

      min-height: 78vh;

      display: flex;

      justify-content: center;

      align-items: center;

      background: #f5f5f5;
    }

    .portal-card {

      width: 600px;

      background: white;

      padding: 48px;

      text-align: center;

      border-radius: 8px;

      box-shadow:
        0 2px 10px rgba(0,0,0,0.1);
    }

    .title {

      font-size: 42px;

      font-weight: 300;

      color: #5a5a5a;

      margin-bottom: 40px;
    }

    .description {

      color: #7b7b7b;

      font-size: 16px;

      margin-bottom: 20px;
    }

    .create-btn {

      background: #0070d2;

      color: white;

      border: none;

      height: 48px;

      padding: 0 32px;

      border-radius: 4px;

      font-size: 18px;

      cursor: pointer;

      margin-bottom: 40px;
    }

    .or-text {

      font-size: 42px;

      color: #666;

      margin-bottom: 32px;
    }

    .label {

      font-size: 24px;

      font-weight: 600;

      color: #444;

      text-align: left;

      margin-bottom: 12px;
    }

    .dropdown {

      width: 100%;

      height: 48px;

      border: 1px solid #ccc;

      border-radius: 4px;

      padding: 0 12px;

      font-size: 16px;
    }

  `]
})
export class NewOutletPortalComponent {

  selectedApplication = '';

  @Output()
  createApplicationClicked = new EventEmitter<void>();

  applications = [
    'Application 1',
    'Application 2',
    'Application 3'
  ];

  onCreateApplication() {

    console.log(
        'Create New Application Clicked'
    );

    this.createApplicationClicked.emit();
    }
}