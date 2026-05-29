export interface MerchantData {

  // MERCHANT INFORMATION
  merchantName: string;

  merchantNumber: string;

  lastFiveIbanDigits: string;

  tradeLicenseNumber: string;

  country: string;

  city: string;

  businessLegalStructure: string;

  // REPRESENTATIVE INFORMATION
  representativeName: string;

  email: string;

  phone: string;

  // TERMS
  termsAccepted: boolean;
}