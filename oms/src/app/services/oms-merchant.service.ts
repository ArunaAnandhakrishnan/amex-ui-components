import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';

import {
  Merchant
} from '../models/merchant.model';

@Injectable({
  providedIn: 'root'
})
export class OmsMerchantService {

  private STORAGE_KEY =
    'oms_merchants';

  // STATE
  private merchantsSubject =
    new BehaviorSubject<
      Merchant[]
    >([]);

  // OBSERVABLE
  merchants$ =
    this.merchantsSubject
      .asObservable();

  constructor() {

    this.loadMerchants();
  }

  // LOAD FROM LOCAL STORAGE
  private loadMerchants() {

    const storedData =
      localStorage.getItem(
        this.STORAGE_KEY
      );

    if (storedData) {

      const merchants =
        JSON.parse(
          storedData
        );

      this.merchantsSubject.next(
        merchants
      );

    } else {

      this.merchantsSubject.next([]);
    }
  }

  // SAVE TO LOCAL STORAGE
  private saveMerchants(
    merchants: Merchant[]
  ) {

    localStorage.setItem(
      this.STORAGE_KEY,

      JSON.stringify(
        merchants
      )
    );

    this.merchantsSubject.next(
      merchants
    );
  }

  // GET MERCHANTS
  getMerchants() {

    return this.merchants$;
  }

  // ADD MERCHANT
  addMerchant(
    merchantNo: string,
    ibanLast5Digits: string
  ) {

    const currentMerchants =
      this.merchantsSubject.value;

    // DUPLICATE CHECK
    const alreadyExists =
      currentMerchants.find(
        merchant =>
          merchant.merchantNo ===
          merchantNo
      );

    if (alreadyExists) {

      console.log(
        'Merchant already exists'
      );

      return false;
    }

    const newMerchant = {

      merchantNo,

      ibanLast5Digits
    };

    const updatedMerchants = [

      ...currentMerchants,

      newMerchant
    ];

    this.saveMerchants(
      updatedMerchants
    );

    console.log(
      'Merchant Added'
    );

    return true;
  }

  // DELETE MERCHANT
  deleteMerchant(
    merchantNo: string
  ) {

    const currentMerchants =
      this.merchantsSubject.value;

    const updatedMerchants =
      currentMerchants.filter(
        merchant =>
          merchant.merchantNo !==
          merchantNo
      );

    this.saveMerchants(
      updatedMerchants
    );

    console.log(
      'Merchant Deleted'
    );
  }

  // CLEAR ALL
  clearMerchants() {

    localStorage.removeItem(
      this.STORAGE_KEY
    );

    this.merchantsSubject.next(
      []
    );
  }
}