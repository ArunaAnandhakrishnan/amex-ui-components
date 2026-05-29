import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';

import {
  MerchantData
} from '../models/merchant-data.model';

import {
  MOCK_MERCHANT_DATA
} from '../mock-data/mock-merchant-data';

@Injectable({
  providedIn: 'root'
})
export class OmsMerchantDataService {

  private STORAGE_KEY =
    'oms_merchant_data';

  // STATE
  private merchantDataSubject =
    new BehaviorSubject<
      MerchantData[]
    >([]);

  // OBSERVABLE
  merchantData$ =
    this.merchantDataSubject
      .asObservable();

  constructor() {

    this.loadMerchantData();
  }

  // LOAD DATA
  private loadMerchantData() {

    const storedData =
      localStorage.getItem(
        this.STORAGE_KEY
      );

    if (storedData) {

      const parsedData =
        JSON.parse(
          storedData
        );

      this.merchantDataSubject.next(
        parsedData
      );

    } else {

      // LOAD MOCK DATA FIRST TIME
      localStorage.setItem(

        this.STORAGE_KEY,

        JSON.stringify(
          MOCK_MERCHANT_DATA
        )
      );

      this.merchantDataSubject.next(
        MOCK_MERCHANT_DATA
      );
    }
  }

  // SAVE DATA
  private saveMerchantData(
    data: MerchantData[]
  ) {

    localStorage.setItem(

      this.STORAGE_KEY,

      JSON.stringify(data)
    );

    this.merchantDataSubject.next(
      data
    );
  }

  // GET ALL
  getMerchantData() {

    return this.merchantData$;
  }

  // ADD
  addMerchantData(
    merchantData: MerchantData
  ) {

    const currentData =
      this.merchantDataSubject.value;

    // DUPLICATE CHECK
    const alreadyExists =
      currentData.find(
        merchant =>

          merchant.merchantNumber ===
          merchantData.merchantNumber
      );

    if (alreadyExists) {

      console.log(
        'Merchant already exists'
      );

      return false;
    }

    const updatedData = [

      ...currentData,

      merchantData
    ];

    this.saveMerchantData(
      updatedData
    );

    console.log(
      'Merchant Added'
    );

    return true;
  }

  // UPDATE
  updateMerchantData(
    updatedMerchant:
      MerchantData
  ) {

    const updatedList =
      this.merchantDataSubject.value.map(
        merchant =>

          merchant.merchantNumber ===
          updatedMerchant.merchantNumber

            ? updatedMerchant

            : merchant
      );

    this.saveMerchantData(
      updatedList
    );

    console.log(
      'Merchant Updated'
    );
  }

  // DELETE
  deleteMerchantData(
    merchantNumber: string
  ) {

    const updatedList =
      this.merchantDataSubject.value.filter(
        merchant =>

          merchant.merchantNumber !==
          merchantNumber
      );

    this.saveMerchantData(
      updatedList
    );

    console.log(
      'Merchant Deleted'
    );
  }

  // GET SINGLE
  getMerchantByNumber(
    merchantNumber: string
  ) {

    return this
      .merchantDataSubject
      .value
      .find(
        merchant =>

          merchant.merchantNumber ===
          merchantNumber
      );
  }

  // CLEAR ALL
  clearMerchantData() {

    localStorage.removeItem(
      this.STORAGE_KEY
    );

    this.merchantDataSubject.next(
      []
    );
  }
}