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
  title = 'wearables-portal';

  wearables = [
    {
      name: 'Amex Smart Band',
      category: 'Fitness',
      points: 25000,
      badge: 'Best Seller',
      icon: '⌚'
    },
    {
      name: 'Amex Pay Ring',
      category: 'Payments',
      points: 15000,
      badge: 'New',
      icon: '💍'
    },
    {
      name: 'Amex Tap Keychain',
      category: 'Convenience',
      points: 10000,
      badge: null,
      icon: '🔑'
    }
  ];
}
