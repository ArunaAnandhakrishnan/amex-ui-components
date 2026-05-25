// ─── Cen LCY EXC Models ──────────────────────────────────────────────────────

export interface CenCustomer {
  clientId:    string;
  name:        string;
  cardNumber:  string;   // masked e.g. '3744XXXXXXX9008'
  currency:    string;   // target billing currency e.g. 'Bahraini Dinar'
}

export interface CenExcApplicationRequest {
  clientId:      string;
  termsAccepted: boolean;
}

export interface CenExcApplicationResult {
  success:       boolean;
  applicationNo: string;
  message:       string;
}
