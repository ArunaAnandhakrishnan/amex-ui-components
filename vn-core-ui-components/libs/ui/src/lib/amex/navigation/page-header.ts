import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * PageHeader
 * onls: dark navy blue banner with white caps text — "PRIORITY PASS™ ENROLLMENT"
 *       matches Lounge / Supp Access / Online Helper screenshots
 * oms:  uppercase bold title + purple divider line
 *       matches OMS portal screenshots
 */
@Component({
  selector: 'amex-page-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- ONLS: dark navy banner -->
    <div *ngIf="portalStyle === 'onls'" class="onls-header">
      {{ title }}
    </div>

    <!-- OMS: title + purple rule -->
    <div *ngIf="portalStyle === 'oms'" class="oms-header">
      <div class="oms-header__title">{{ title }}</div>
      <div class="oms-header__rule"></div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    /* ONLS: solid navy banner with white text — matches portal screenshots exactly */
    .onls-header {
      background: #1e3a6e;
      color: #fff;
      font-size: 15px; font-weight: bold;
      padding: 10px 16px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    /* OMS: uppercase title + purple accent rule */
    .oms-header { }
    .oms-header__title {
      font-size: 15px; font-weight: bold;
      color: #1e3a5f; text-transform: uppercase;
      letter-spacing: 0.5px; padding-bottom: 6px;
    }
    .oms-header__rule {
      height: 3px; background: #7b1fa2; width: 100%;
    }
  `],
})
export class AmexPageHeaderComponent {
  @Input() portalStyle: 'onls' | 'oms' = 'onls';
  @Input() title = '';
}
