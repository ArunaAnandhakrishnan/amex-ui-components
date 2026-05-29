import {
  Component
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  AmexMerchantDataFormComponent
} from '@vn-core-ui-components/ui';

import {
  OmsMerchantDataService
} from '../../services/oms-merchant-data.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-merchant-data-form',

  standalone: true,

  imports: [
    CommonModule,
    AmexMerchantDataFormComponent
  ],

  templateUrl:
    './oms-merchant-data-form.component.html',
})
export class OmsMerchantDataFormComponent {

  title =
    'MERCHANT DETAILS';

  backLabel =
    'Back';

  submitLabel =
    'Submit';

  // COUNTRY OPTIONS
  countryOptions = [
    'UAE',
    'India',
    'USA',
    'UK'
  ];

  // CITY OPTIONS
  cityOptions = [
    'Dubai',
    'Abu Dhabi',
    'Mumbai',
    'London'
  ];

  // LEGAL OPTIONS
  legalOptions = [
    'LLC',
    'Corporation',
    'Partnership',
    'Sole Proprietorship'
  ];

  // INITIAL FORM DATA
  initialData = {};

  isSubmitting = false;

  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    private merchantDataService:
      OmsMerchantDataService
  ) {}

  // SUBMIT
  onSubmit(
    event: any
  ) {

    console.log(
      'Merchant Form Submitted:',
      event
    );

    this.isSubmitting = true;

    // MOCK API DELAY
    setTimeout(() => {

      const isAdded =
        this.merchantDataService
          .addMerchantData(
            event
          );

      this.isSubmitting = false;

      if (isAdded) {

        alert(
          'Merchant Data Saved Successfully'
        );

      } else {

        alert(
          'Merchant already exists'
        );
      }

    }, 1500);
  }

  // BACK
  onBack() {

    console.log(
      'Back Clicked'
    );
  }
}