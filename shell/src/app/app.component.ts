import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <div class="mfe-loading-bar" [class.visible]="mfeLoading"></div>

    <ng-container *ngIf="isLoginPage; else shellLayout">
      <router-outlet></router-outlet>
    </ng-container>

    <ng-template #shellLayout>
      <!-- Full ONLS shell: header (nav+tabs) + body (sidebar + content) -->
      <div class="shell-wrap">
        <app-header></app-header>
        <div class="shell-body">
          <app-sidebar></app-sidebar>
          <div class="shell-main">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </ng-template>
  `,
})
export class AppComponent implements OnInit {
  isLoginPage = false;
  mfeLoading  = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(e =>
        e instanceof NavigationEnd   ||
        e instanceof NavigationStart ||
        e instanceof NavigationCancel ||
        e instanceof NavigationError
      )
    ).subscribe((e: any) => {
      if (e instanceof NavigationStart) {
        this.mfeLoading = true;
      } else {
        this.mfeLoading = false;
        if (e instanceof NavigationEnd) {
          this.isLoginPage = (e.urlAfterRedirects as string).startsWith('/login');
        }
      }
    });
  }
}
