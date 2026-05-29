import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';

import {
  ContactInformation
} from '../models/contact-information.model';

@Injectable({
  providedIn: 'root'
})
export class OmsContactInformationService {

  private STORAGE_KEY =
    'oms_contact_information';

  // STATE
  private contactInfoSubject =
    new BehaviorSubject<
      ContactInformation[]
    >([]);

  // OBSERVABLE
  contactInfo$ =
    this.contactInfoSubject
      .asObservable();

  constructor() {

    this.loadData();
  }

  // LOAD DATA
  private loadData() {

    const storedData =
      localStorage.getItem(
        this.STORAGE_KEY
      );

    if (storedData) {

      this.contactInfoSubject.next(

        JSON.parse(storedData)
      );

    } else {

      this.contactInfoSubject.next([]);
    }
  }

  // SAVE DATA
  private saveData(
    data: ContactInformation[]
  ) {

    localStorage.setItem(

      this.STORAGE_KEY,

      JSON.stringify(data)
    );

    this.contactInfoSubject.next(
      data
    );
  }

  // GET ALL
  getContactInformation() {

    return this.contactInfo$;
  }

  // GET BY SECTION
  getBySection(
    sectionTitle: string
  ) {

    return this
      .contactInfoSubject
      .value
      .filter(
        item =>

          item.sectionTitle ===
          sectionTitle
      );
  }

  // SAVE SECTION DATA
  saveSectionData(
    sectionTitle: string,

    contacts: any[]
  ) {

    // REMOVE OLD SECTION DATA
    const remainingData =
      this.contactInfoSubject
        .value
        .filter(
          item =>

            item.sectionTitle !==
            sectionTitle
        );

    // ADD NEW SECTION DATA
    const updatedSectionData =
      contacts.map(
        contact => ({

          ...contact,

          sectionTitle
        })
      );

    const updatedData = [

      ...remainingData,

      ...updatedSectionData
    ];

    this.saveData(
      updatedData
    );

    console.log(
      `${sectionTitle} Saved`
    );
  }

  // CLEAR ALL
  clearAll() {

    localStorage.removeItem(
      this.STORAGE_KEY
    );

    this.contactInfoSubject.next(
      []
    );
  }
}