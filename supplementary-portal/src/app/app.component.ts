import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'supplementary-portal';

  cards = [
    {
      type: 'Gold Supplementary',
      holder: 'Add a family member',
      limit: '$5,000',
      perks: ['Earn points together', 'Shared billing', 'Emergency card'],
      color: '#B8860B'
    },
    {
      type: 'Platinum Supplementary',
      holder: 'Add a trusted person',
      limit: '$10,000',
      perks: ['Lounge access', 'Concierge service', 'Priority support'],
      color: '#606060'
    },
    {
      type: 'Green Supplementary',
      holder: 'Add an employee',
      limit: '$2,000',
      perks: ['Expense tracking', 'Spend controls', 'Digital receipts'],
      color: '#2D7A3A'
    }
  ];
}
