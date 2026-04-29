import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pay-with-points-portal';

  availablePoints = 85000;
  pointsToRedeem = 10000;
  pointValue = 0.006; // $0.006 per point

  get dollarValue(): number {
    return +(this.pointsToRedeem * this.pointValue).toFixed(2);
  }

  get remainingPoints(): number {
    return this.availablePoints - this.pointsToRedeem;
  }

  categories = [
    { label: 'Travel', icon: '✈️', rate: '$0.007/pt' },
    { label: 'Shopping', icon: '🛍️', rate: '$0.006/pt' },
    { label: 'Dining', icon: '🍽️', rate: '$0.006/pt' },
    { label: 'Statement Credit', icon: '💳', rate: '$0.006/pt' }
  ];

  selectedCategory = 'Travel';

  recentTransactions = [
    { merchant: 'Delta Airlines', points: 12000, date: 'Apr 15', status: 'Completed' },
    { merchant: 'Amazon', points: 5000, date: 'Apr 10', status: 'Completed' },
    { merchant: 'Marriott Hotels', points: 20000, date: 'Mar 28', status: 'Completed' }
  ];

  redeemed = false;

  redeem() {
    if (this.pointsToRedeem > 0 && this.pointsToRedeem <= this.availablePoints) {
      this.availablePoints -= this.pointsToRedeem;
      this.redeemed = true;
      setTimeout(() => (this.redeemed = false), 3000);
    }
  }
}
