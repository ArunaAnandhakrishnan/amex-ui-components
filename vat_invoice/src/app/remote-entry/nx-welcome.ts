import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VatHomeComponent } from '../pages/vat-home/vat-home.component';
import { VatReportViewComponent } from '../pages/vat-report-view/vat-report-view.component';
import { VatSidebarComponent } from '../pages/vat-sidebar/vat-sidebar.component';
import { VatInvoiceDetailsComponent } from '../pages/vat-invoice-details/vat-invoice-details.component';
import { VatInvoiceMockService } from '../services/vat-invoice-mock.service';

@Component({
  selector: 'app-nx-welcome',
  standalone: true,
  imports: [
    CommonModule,
    VatHomeComponent,
    VatReportViewComponent,
    VatSidebarComponent,
    VatInvoiceDetailsComponent
  ],
  templateUrl: './remote-entry.html',
  styles: [`
  .layout {
    display: flex;
    align-items: flex-start;
    width: 100%;
  }

  .sidebar {
    width: 220px;
    min-width: 220px;
    border-right: 1px solid #ccc;
    background: #f5f5f5;
  }

  .content {
    flex: 1;
    padding: 10px;
    overflow-x: auto;
  }

  vat-report-view {
    display: block;
    width: 100%;
  }
`],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcome {

  showVatReport = false;
  showInvoiceDetails = false;

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private vatInvoiceService: VatInvoiceMockService
  ) {}

  onTabChanged(tabId: string) {

    console.log('Selected Tab:', tabId);

    if (tabId === 'vat') {
      this.showVatReport = true;
    } else {
      this.showVatReport = false;
    }
  }

  onGenerateReport(invoiceNumber: string) {

    console.log('Invoice Number:', invoiceNumber);

    this.vatInvoiceService
      .generateInvoiceReport(invoiceNumber);

    this.showInvoiceDetails = true;
  }
}
