import { Component, Input, OnInit } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { HttpClient }    from '@angular/common/http';

import {
  AmexPageHeaderComponent,
  AmexBreadcrumbTrailComponent,
  AmexCardListSelectorComponent,  AmexCardRow,
  AmexWearableDeviceTableComponent, WearableDeviceRow,
  AmexWearableIssuanceFormComponent, WearableIssuanceData,
  AmexWearableDetailsViewComponent, WearableDevice,
  AmexWearableTileComponent, AmexWearable,
  AmexSuccessToastComponent,
  AmexConfirmationModalComponent,
} from '@vn-core-ui-components/ui';

type Step = 'search' | 'cards' | 'issue' | 'done';

interface WearableTypeOption {
  id: string; label: string; icon: string; color: string;
}

const API_BASE = 'http://localhost:8080/api';

@Component({
  selector: 'app-wearables',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AmexPageHeaderComponent,
    AmexBreadcrumbTrailComponent,
    AmexCardListSelectorComponent,
    AmexWearableDeviceTableComponent,
    AmexWearableIssuanceFormComponent,
    AmexWearableDetailsViewComponent,
    AmexWearableTileComponent,
    AmexSuccessToastComponent,
    AmexConfirmationModalComponent,
  ],
  template: `
    <!-- Shell provides outer chrome in MFE mode.
         Wrapper provides AmexPageShell in standalone mode.
         This component is always just: header + content. -->

    <amex-page-header
      *ngIf="showPageHeader"
      portalStyle="onls"
      title="AMEX WEARABLES">
    </amex-page-header>

    <amex-breadcrumb-trail [items]="breadcrumbs" (itemClick)="onBreadcrumb($event)">
    </amex-breadcrumb-trail>

    <div class="page-content">

      <div class="api-status"
           [class.api-status--ok]="apiOnline"
           [class.api-status--err]="apiOnline === false">
        <span *ngIf="apiOnline === null">⏳ Checking backend…</span>
        <span *ngIf="apiOnline === true">✅ Backend connected (port 8080)</span>
        <span *ngIf="apiOnline === false">⚠️ Backend offline — using mock data</span>
      </div>

      <!-- STEP 1 & 2 -->
      <ng-container *ngIf="step === 'search' || step === 'cards'">
        <amex-card-list-selector
          searchLabel="Client Code"
          placeholder="eg. 12345"
          submitLabel="Submit"
          [rows]="cardRows"
          [memberName]="memberName"
          (search)="onSearch($event)"
          (cardSelect)="onCardSelect($event)">
        </amex-card-list-selector>

        <div *ngIf="step === 'cards' && selectedCard" class="devices-section">
          <amex-wearable-device-table
            title="Wearable Devices"
            [rows]="wearableRows"
            [showTypeTabs]="true"
            (actionClick)="onDeviceAction($event)">
          </amex-wearable-device-table>

          <div class="issue-new-row">
            <button class="issue-new-btn" (click)="startIssuance()">
              + Issue New Wearable
            </button>
          </div>
        </div>
      </ng-container>

      <!-- STEP 3 -->
      <ng-container *ngIf="step === 'issue'">
        <div class="issue-layout">
          <div class="issue-left">
            <div class="type-selector-title">Select Wearable Type</div>
            <div class="type-selector">
              <div *ngFor="let t of wearableTypeOptions"
                class="type-card"
                [class.type-card--active]="issuanceForm.wearableType === t.id"
                (click)="selectWearableType(t)">
                <span class="type-icon">{{ t.icon }}</span>
                <span class="type-label">{{ t.label }}</span>
              </div>
            </div>

            <div *ngIf="issuanceForm.wearableType" class="color-picker-section">
              <div class="color-picker-title">Select Color</div>
              <div class="color-swatches">
                <div *ngFor="let c of colorOptions"
                  class="color-swatch"
                  [class.color-swatch--active]="issuanceForm.colorSelected === c.hex"
                  [style.background]="c.hex"
                  [title]="c.name"
                  (click)="selectColor(c)">
                </div>
              </div>
            </div>

            <div *ngIf="selectedCard" class="selected-card-info">
              <div class="selected-card-label">Selected Card</div>
              <div class="selected-card-value">{{ selectedCard.cardNumber }}</div>
              <div class="selected-card-type">{{ selectedCard.cardType }}</div>
            </div>
          </div>

          <div class="issue-right">
            <amex-wearable-issuance-form
              [form]="issuanceForm"
              (submitClick)="onSubmitIssuance($event)">
            </amex-wearable-issuance-form>
          </div>
        </div>

        <div class="back-row">
          <button class="back-btn" (click)="step = 'cards'">← Back to Card Selection</button>
        </div>
      </ng-container>

      <!-- STEP 4 -->
      <ng-container *ngIf="step === 'done'">
        <div *ngIf="issuedWearables.length" class="issued-section">
          <div class="issued-title">Wearable Devices Linked</div>
          <div class="issued-tiles">
            <amex-wearable-tile
              *ngFor="let w of issuedWearables"
              [wearable]="w"
              [showActions]="true"
              (activate)="onActivate($event)"
              (suspend)="onSuspend($event)">
            </amex-wearable-tile>
          </div>
        </div>

        <amex-wearable-details-view
          [device]="latestDevice"
          [devices]="deviceHistory"
          (search)="onSearch($event)"
          (issueNew)="startIssuance()"
          (viewHistory)="onViewHistory($event)">
        </amex-wearable-details-view>

        <div class="issue-new-row">
          <button class="issue-new-btn" (click)="step = 'search'; reset()">
            Search Another Client
          </button>
        </div>
      </ng-container>

      <amex-success-toast
        *ngIf="successMsg"
        [message]="successMsg"
        portalStyle="onls"
        [autoDismiss]="true"
        [duration]="4000"
        (dismissed)="successMsg = ''">
      </amex-success-toast>

    </div>

    <amex-confirmation-modal
      [visible]="showConfirmModal"
      portalStyle="onls"
      [message]="confirmMsg"
      confirmLabel="OK"
      cancelLabel="Cancel"
      (confirm)="confirmIssuance()"
      (cancel)="showConfirmModal = false">
    </amex-confirmation-modal>
  `,
  styles: [`
    :host { display: block; font-family: Arial, sans-serif; }
    .page-content { padding: 8px 16px; background: #fff; min-height: calc(100vh - 180px); }
    .api-status { display: inline-block; padding: 4px 12px; border-radius: 12px; font-size: 12px; margin-bottom: 12px; background: #f0f0f0; color: #555; }
    .api-status--ok  { background: #e6f4ea; color: #1e7e34; }
    .api-status--err { background: #fff3cd; color: #856404; }
    .devices-section { margin-top: 24px; }
    .issue-new-row { margin-top: 16px; }
    .issue-new-btn { background: linear-gradient(to bottom, #5ba3e0, #006fcf); color: #fff; border: 1px solid #0058b0; padding: 7px 20px; font-size: 13px; cursor: pointer; border-radius: 2px; font-weight: bold; }
    .issue-new-btn:hover { background: linear-gradient(to bottom, #4a92cf, #0054a8); }
    .issue-layout { display: flex; gap: 40px; align-items: flex-start; padding: 8px 0 20px; }
    .issue-left  { flex: 1; max-width: 480px; }
    .issue-right { flex-shrink: 0; width: 320px; }
    .type-selector-title { font-size: 14px; font-weight: bold; color: #1a3a6b; margin-bottom: 16px; padding-bottom: 6px; border-bottom: 2px solid #1a3a6b; }
    .type-selector { display: flex; gap: 24px; margin-bottom: 24px; }
    .type-card { display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 16px 20px; border: 2px solid #ddd; border-radius: 8px; cursor: pointer; background: #fff; min-width: 100px; transition: border-color .15s, background .15s; }
    .type-card:hover   { border-color: #006fcf; background: #f0f6ff; }
    .type-card--active { border-color: #1a3a6b; background: #e8f0f8; }
    .type-icon  { font-size: 32px; }
    .type-label { font-size: 13px; font-weight: bold; color: #1a3a6b; }
    .color-picker-section { margin-bottom: 24px; }
    .color-picker-title { font-size: 13px; font-weight: bold; color: #555; margin-bottom: 10px; }
    .color-swatches { display: flex; gap: 10px; flex-wrap: wrap; }
    .color-swatch { width: 32px; height: 32px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; transition: border-color .15s, transform .1s; }
    .color-swatch:hover   { transform: scale(1.1); }
    .color-swatch--active { border-color: #1a3a6b; transform: scale(1.15); }
    .selected-card-info { border: 1px solid #b0cce0; padding: 12px 16px; background: #f0f8ff; border-radius: 2px; }
    .selected-card-label { font-size: 11px; color: #888; margin-bottom: 2px; }
    .selected-card-value { font-size: 14px; font-weight: bold; color: #1a3a6b; }
    .selected-card-type  { font-size: 12px; color: #555; margin-top: 2px; }
    .back-row { margin-top: 12px; }
    .back-btn { background: none; border: none; color: #006fcf; font-size: 12px; cursor: pointer; text-decoration: underline; }
    .issued-section { margin-bottom: 20px; }
    .issued-title { font-size: 14px; font-weight: bold; color: #1a3a6b; margin-bottom: 12px; padding-bottom: 6px; border-bottom: 2px solid #1a3a6b; }
    .issued-tiles { display: flex; flex-direction: column; gap: 8px; max-width: 600px; }
  `],
})
export class WearablesComponent implements OnInit {

  /** false when inside shell MFE — shell already shows the page title area */
  @Input() showPageHeader = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void { this.checkBackendHealth(); }

  step: Step = 'search';
  apiOnline: boolean | null = null;
  clientCode = ''; memberName = '';
  cardRows: AmexCardRow[] = [];
  selectedCard: AmexCardRow | null = null;
  wearableRows: WearableDeviceRow[] = [];
  issuedWearables: AmexWearable[] = [];
  latestDevice: WearableDevice | null = null;
  deviceHistory: WearableDevice[] = [];
  successMsg = ''; showConfirmModal = false; confirmMsg = '';
  pendingIssuance: WearableIssuanceData | null = null;

  breadcrumbs = [
    { id: 'home',      label: 'Home'           },
    { id: 'misc',      label: 'Misc'           },
    { id: 'wearables', label: 'AMEX Wearables' },
  ];

  wearableTypeOptions: WearableTypeOption[] = [
    { id: 'bracelet', label: 'Bracelet', icon: '📿', color: '#c0a040' },
    { id: 'band',     label: 'Band',     icon: '⌚', color: '#3a3a3a' },
    { id: 'ring',     label: 'Ring',     icon: '💍', color: '#c0a040' },
  ];

  colorOptions = [
    { name: 'Black',     hex: '#1a1a1a' },
    { name: 'Rose Gold', hex: '#b76e79' },
    { name: 'Silver',    hex: '#a8a9ad' },
    { name: 'Navy Blue', hex: '#1a3a6b' },
    { name: 'Champagne', hex: '#e8d5a3' },
  ];

  issuanceForm: WearableIssuanceData = {
    clientCode: '', selectedCard: '', wearableType: '',
    colorSelected: '', wearableName: '', tcAccepted: false,
  };

  private checkBackendHealth(): void {
    this.http.get<{ status: string }>(`${API_BASE}/health`).subscribe({
      next:  () => { this.apiOnline = true; },
      error: () => { this.apiOnline = false; },
    });
  }

  onBreadcrumb(_id: string) {}

  onSearch(clientCode: string) {
    if (!clientCode.trim()) return;
    this.clientCode = clientCode.trim();
    this.http.get<any>(`${API_BASE}/wearables/client/${this.clientCode}`).subscribe({
      next: (data) => {
        this.memberName = data.memberName ?? 'Unknown Member';
        this.cardRows = data.cards ?? [];
        this.step = 'cards';
      },
      error: () => {
        this.memberName = 'John Doe';
        this.cardRows = [
          { cardNumber: '3744 XXXXXX 9008', cardType: 'Centurion', status: 'Active'   },
          { cardNumber: '3782 XXXXXX 0005', cardType: 'Platinum',  status: 'Active'   },
          { cardNumber: '3711 XXXXXX 1234', cardType: 'Gold',      status: 'Inactive' },
        ];
        this.step = 'cards';
      },
    });
  }

  onCardSelect(card: AmexCardRow) {
    this.selectedCard = card;
    this.issuanceForm.selectedCard = card.cardNumber;
    this.issuanceForm.clientCode   = this.clientCode;
    this.http.get<any>(`${API_BASE}/wearables/devices/${card.cardNumber}`).subscribe({
      next:  (data) => { this.wearableRows = data.devices ?? []; },
      error: () => {
        this.wearableRows = [
          { deviceType: 'Bracelet', status: 'Issued',   cardLinked: card.cardNumber, issueDate: '12 Jan 2025' },
          { deviceType: 'Ring',     status: 'Inactive', cardLinked: card.cardNumber, issueDate: '05 Mar 2024' },
        ];
      },
    });
  }

  onDeviceAction(event: { action: string; row: WearableDeviceRow }) {
    if (event.action === 'issue' || event.action === 'claim') { this.startIssuance(); }
    if (event.action === 'view') {
      this.latestDevice = {
        clientCode: this.clientCode, deviceType: event.row.deviceType,
        status: event.row.status, issueDate: event.row.issueDate,
        cardLinked: event.row.cardLinked,
        serialNo: 'SN-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
      };
      this.step = 'done';
    }
  }

  startIssuance() {
    this.issuanceForm.wearableType = '';
    this.issuanceForm.colorSelected = '';
    this.issuanceForm.wearableName = '';
    this.issuanceForm.tcAccepted = false;
    this.step = 'issue';
  }

  selectWearableType(t: WearableTypeOption) {
    this.issuanceForm.wearableType = t.id;
    this.issuanceForm.wearableName = `Amex ${t.label}`;
  }

  selectColor(c: { name: string; hex: string }) { this.issuanceForm.colorSelected = c.hex; }

  onSubmitIssuance(form: WearableIssuanceData) {
    this.pendingIssuance = { ...form };
    this.confirmMsg = `Issue a ${form.wearableType} wearable linked to card ${form.selectedCard}?`;
    this.showConfirmModal = true;
  }

  confirmIssuance() {
    this.showConfirmModal = false;
    if (!this.pendingIssuance) return;
    const f = this.pendingIssuance;
    const typeLabel = this.wearableTypeOptions.find(t => t.id === f.wearableType)?.label ?? f.wearableType;
    this.latestDevice = {
      clientCode: f.clientCode, deviceType: typeLabel, status: 'Issued',
      issueDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      cardLinked: f.selectedCard,
      serialNo: 'SN-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
    };
    const typeMap: Record<string, 'ring' | 'bracelet' | 'band'> = { ring: 'ring', bracelet: 'bracelet', band: 'band' };
    this.issuedWearables = [{
      id: 'WR-' + Date.now(), type: typeMap[f.wearableType] ?? 'other' as any,
      deviceName: f.wearableName, linkedCardLast4: f.selectedCard.slice(-4),
      status: 'active', issuedDate: this.latestDevice.issueDate, nfcEnabled: true,
    }];
    this.deviceHistory = [this.latestDevice];
    this.successMsg = `Wearable issued successfully. Serial No: ${this.latestDevice.serialNo}`;
    this.pendingIssuance = null;
    this.step = 'done';
  }

  onActivate(w: AmexWearable) { this.successMsg = `${w.deviceName} activated.`; }
  onSuspend(w: AmexWearable)  { this.successMsg = `${w.deviceName} suspended.`; }
  onViewHistory(d: WearableDevice) { this.successMsg = `Viewing history for ${d.deviceType} (${d.serialNo}).`; }

  reset() {
    this.clientCode = ''; this.memberName = '';
    this.cardRows = []; this.selectedCard = null;
    this.wearableRows = []; this.issuedWearables = [];
    this.latestDevice = null; this.deviceHistory = [];
    this.issuanceForm = { clientCode: '', selectedCard: '', wearableType: '', colorSelected: '', wearableName: '', tcAccepted: false };
  }
}