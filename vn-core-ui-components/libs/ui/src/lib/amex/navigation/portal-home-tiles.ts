import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AmexPortalTile {
  id: string;
  label: string;
  icon: string;  /* emoji or text icon */
  enabled: boolean;
}

/**
 * PortalHomeTiles
 * Shown after Hub Login — grid of clickable tiles for each sub-portal.
 * Matches the ONLS home screen with all available sub-portal navigation cards.
 * Tiles: SUPP_ACCESS_HELPER, QPAY_INQUIRY, VAT, Digital Wallet,
 *        Amex Wearables, Centurion, Statements, Pay with Points, Priority Pass
 */
@Component({
  selector: 'amex-portal-home-tiles',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="portal-shell">
      <!-- top blue strip -->
      <div class="portal-strip">
        <span class="portal-strip__global">Global Sites</span>
        <button class="portal-strip__logout" (click)="logout.emit()">Log Out</button>
      </div>
      <!-- header -->
      <div class="portal-header">
        <div class="portal-logo">
          <span class="portal-logo__text">AM<br>EX</span>
        </div>
        <span class="portal-header__title">{{ portalTitle }}</span>
      </div>
      <div class="portal-header__rule"></div>

      <!-- tiles grid -->
      <div class="portal-body">
        <div class="onls-sidebar"><div class="onls-sidebar__hatch"></div></div>
        <div class="portal-content">
          <div class="tiles-grid">
            <div *ngFor="let tile of tiles"
              class="tile"
              [class.tile--disabled]="!tile.enabled"
              (click)="tile.enabled && tileClick.emit(tile.id)">
              <div class="tile__icon">{{ tile.icon }}</div>
              <div class="tile__label">{{ tile.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- footer -->
      <div class="portal-footer">
        <span class="portal-footer__links">
          <a class="portal-footer__link">American Express Web Site Rules and Regulations</a> |
          <a class="portal-footer__link">News Centre</a> |
          <a class="portal-footer__link">Fraud Protection Centre</a> |
          <a class="portal-footer__link">Trademarks</a> |
          <a class="portal-footer__link">Privacy Statement</a>
        </span>
        <span class="portal-footer__copy">Copyright &copy; 2009 American Express Company</span>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }

    /* Shell chrome */
    .portal-strip {
      background: #006fcf; display: flex; justify-content: flex-end;
      align-items: center; padding: 2px 8px; gap: 12px; font-size: 11px;
    }
    .portal-strip__global { color: #fff; text-decoration: underline; cursor: pointer; }
    .portal-strip__logout {
      background: #fff; border: 1px solid #ccc; color: #333;
      font-size: 11px; font-family: Arial, sans-serif; padding: 1px 10px;
      cursor: pointer; border-radius: 1px;
    }
    .portal-header {
      background: #fff; display: flex; align-items: center;
      padding: 6px 10px; gap: 8px; min-height: 50px;
      border-bottom: 1px solid #d0d0d0;
    }
    .portal-logo {
      width: 40px; height: 40px; background: #006fcf;
      display: flex; align-items: center; justify-content: center;
      border-radius: 3px; flex-shrink: 0;
    }
    .portal-logo__text {
      color: #fff; font-weight: 900; font-size: 12px;
      font-family: 'Arial Black', sans-serif; line-height: 1.1;
      text-align: center; letter-spacing: -1px;
    }
    .portal-header__title { font-size: 18px; color: #333; }
    .portal-header__rule {
      height: 2px;
      background: linear-gradient(to right, #b8d0e8, #e8f0f8, #b8d0e8);
      border-top: 1px solid #c4d8ec;
    }

    /* Body with hatched sidebar */
    .portal-body { display: flex; flex: 1; min-height: 300px; }
    .onls-sidebar {
      width: 160px; flex-shrink: 0; position: relative; overflow: hidden;
    }
    .onls-sidebar__hatch {
      position: absolute; inset: 0; background-color: #d4d4d4;
      background-image: repeating-linear-gradient(
        45deg, transparent, transparent 4px,
        rgba(255,255,255,0.4) 4px, rgba(255,255,255,0.4) 5px
      );
    }
    .portal-content { flex: 1; padding: 24px 28px; background: #fff; }

    /* Tiles */
    .tiles-grid {
      display: flex; flex-wrap: wrap; gap: 16px;
    }
    .tile {
      width: 140px; height: 100px;
      background: #fff;
      border: 1px solid #c8d8ea;
      border-radius: 4px;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 10px; cursor: pointer;
      transition: box-shadow 0.15s, border-color 0.15s;
      padding: 10px;
    }
    .tile:hover {
      border-color: #006fcf;
      box-shadow: 0 2px 8px rgba(0,111,207,0.15);
    }
    .tile--disabled {
      opacity: 0.45; cursor: not-allowed;
    }
    .tile--disabled:hover { border-color: #c8d8ea; box-shadow: none; }
    .tile__icon { font-size: 28px; line-height: 1; }
    .tile__label {
      font-size: 11px; font-weight: bold; color: #1a3a6b;
      text-align: center; line-height: 1.3;
      text-transform: uppercase; letter-spacing: 0.3px;
    }

    /* Footer */
    .portal-footer {
      background: #fff; border-top: 1px solid #ddd;
      padding: 6px 10px; display: flex;
      justify-content: space-between; align-items: center;
      font-size: 11px; flex-wrap: wrap; gap: 4px;
    }
    .portal-footer__links { display: flex; gap: 2px; flex-wrap: wrap; }
    .portal-footer__link { color: #006fcf; cursor: pointer; text-decoration: none; }
    .portal-footer__link:hover { text-decoration: underline; }
    .portal-footer__copy { color: #666; }
  `],
})
export class AmexPortalHomeTilesComponent {
  @Input() portalTitle = 'ONLS Helper Tool';
  @Input() tiles: AmexPortalTile[] = [
    { id: 'supp',      label: 'Supp Access Helper',  icon: '🪪', enabled: true },
    { id: 'qpay',      label: 'QPay Inquiry',         icon: '💳', enabled: true },
    { id: 'vat',       label: 'VAT Invoice',          icon: '🧾', enabled: true },
    { id: 'wallet',    label: 'Digital Wallet',       icon: '📱', enabled: true },
    { id: 'wearables', label: 'Amex Wearables',       icon: '⌚', enabled: true },
    { id: 'centurion', label: 'Centurion',            icon: '🖤', enabled: true },
    { id: 'stmts',     label: 'Statements',           icon: '📄', enabled: true },
    { id: 'points',    label: 'Pay with Points',      icon: '⭐', enabled: true },
    { id: 'lounge',    label: 'Priority Pass',        icon: '🛫', enabled: true },
  ];
  @Output() tileClick = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();
}
