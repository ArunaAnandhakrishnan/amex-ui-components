import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cent-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-page">
      <div class="home-actions">
        <button class="home-btn" (click)="goToPersonalize()">Personalize My Card</button>
        <button class="home-btn" (click)="goToLoadClient()">Load Client Data</button>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .home-page    { padding: 20px 24px; }
    .home-actions { display: flex; gap: 12px; }
    .home-btn {
      background: linear-gradient(to bottom, #5ba3e0, #006fcf);
      color: #fff; border: 1px solid #005fba;
      padding: 8px 22px; font-size: 13px;
      cursor: pointer; border-radius: 3px;
    }
    .home-btn:hover { background: linear-gradient(to bottom, #4a92cf, #0058a6); }
  `],
})
export class CentHomeComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  goToPersonalize(): void {
    this.router.navigate(['../personalize'], { relativeTo: this.route });
  }

  goToLoadClient(): void {
    this.router.navigate(['../load-client'], { relativeTo: this.route });
  }
}