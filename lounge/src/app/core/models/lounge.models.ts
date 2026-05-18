// ─── Priority Pass Models ────────────────────────────────────────────────────

export interface LoungeCard {
  cardNumber: string;                // e.g. '3782 822463 10005'
  cardType:   string;                // e.g. 'The American Express® Corporate Card'
  variant:    string;                // e.g. 'BULLET P'
  enrolled:   boolean;
  entitlements: string[];
  selected?:  boolean;
}

export interface LoungeCustomer {
  clientCode:  string;
  name:        string;
  mobile:      string;
  email:       string;
  cards:       LoungeCard[];
}

export interface PriorityPassEnrollRequest {
  clientCode:   string;
  selectedCards: LoungeCard[];
  termsAccepted: boolean;
}

export interface PriorityPassEnrollResult {
  success:  boolean;
  message:  string;
  referenceId?: string;
}
