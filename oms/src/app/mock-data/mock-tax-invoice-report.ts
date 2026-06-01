import {
  TaxInvoiceReportData
} from '../models/tax-invoice-report.model';

export const MOCK_TAX_INVOICE_REPORT:
  TaxInvoiceReportData = {

  vatSearchType:
    'vat',

  vatRegistrationNumber:
    'VAT123456789',

  merchantNumber:
    '9275640241',

  selectedCountry:
    'UAE',

  fromDate:
    '2026-01-01',

  toDate:
    '2026-01-31',

  reportType:
    'summary'
};