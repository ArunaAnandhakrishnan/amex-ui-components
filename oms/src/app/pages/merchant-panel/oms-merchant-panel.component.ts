import {
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';

import { CommonModule }
from '@angular/common';

import {
  AmexAddDeleteMerchantPanelComponent
} from '@vn-core-ui-components/ui';

import {
  Merchant
} from '../../models/merchant.model';

import {
  OmsMerchantService
} from '../../services/oms-merchant.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-merchant-panel',

  standalone: true,

  imports: [
    CommonModule,
    AmexAddDeleteMerchantPanelComponent
  ],

  templateUrl:
    './oms-merchant-panel.component.html',

  styleUrls: [
    './oms-merchant-panel.component.css'
  ]
})
export class OmsMerchantPanelComponent
  implements OnInit {

  @Output()
  startClicked =
    new EventEmitter<void>();

  merchantOptions: any[] = [];

  merchants: Merchant[] = [];

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private merchantService:
      OmsMerchantService
  ) {}

  isAddingMerchant = false;

  isDeletingMerchant = false;

  // INIT
  ngOnInit() {

    this.loadMerchants();
  }

  // LOAD MERCHANTS
  loadMerchants() {

    this.merchantService
      .getMerchants()
      .subscribe(merchants => {

        this.merchants =
          merchants;

        this.merchantOptions =
          merchants.map(
            merchant => ({

              merchantNo:
                merchant.merchantNo,

              ibanLast5Digits:
                merchant.ibanLast5Digits,

              label:
                merchant.merchantNo
            })
          );

        console.log(
          'Merchant List:',
          merchants
        );
      });
  }

  // ADD MERCHANT
  onAddMerchant(
  event: any
) {

  console.log(
    'Add Merchant Event:',
    event
  );

  const merchantNo =
    event?.merchantNo;

  const ibanLast5Digits =
    event?.lastFiveIban;

  // VALIDATION
  if (
    !merchantNo ||
    !ibanLast5Digits
  ) {

    alert(
      'Please enter all fields'
    );

    return;
  }

  const isAdded =
    this.merchantService
      .addMerchant(
        merchantNo,
        ibanLast5Digits
      );

  if (isAdded) {

    alert(
      'Merchant Added Successfully'
    );

  } else {

    alert(
      'Merchant already exists'
    );
  }
}

  // DELETE MERCHANT
  onDeleteMerchant(
  merchantNo: string
) {

  console.log(
    'Delete Merchant:',
    merchantNo
  );

  this.merchantService
    .deleteMerchant(
      merchantNo
    );

  alert(
    'Merchant Deleted'
  );
}

  // START
  onStart() {

    console.log(
      'Start Clicked'
    );

    this.startClicked.emit();
  }
}