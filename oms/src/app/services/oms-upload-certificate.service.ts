import {
  Injectable
} from '@angular/core';

import {
  BehaviorSubject
} from 'rxjs';

import {
  UploadCertificateData
} from '../models/upload-certificate.model';

@Injectable({
  providedIn: 'root'
})
export class OmsUploadCertificateService {

  private STORAGE_KEY =
    'oms_upload_certificate';

  // STATE
  private uploadSubject =
    new BehaviorSubject<
      UploadCertificateData | null
    >(null);

  // OBSERVABLE
  upload$ =
    this.uploadSubject
      .asObservable();

  constructor() {

    this.loadData();
  }

  // LOAD
  private loadData() {

    const storedData =
      localStorage.getItem(
        this.STORAGE_KEY
      );

    if (storedData) {

      this.uploadSubject.next(

        JSON.parse(storedData)
      );
    }
  }

  // SAVE
  saveCertificate(
    data: UploadCertificateData
  ) {

    localStorage.setItem(

      this.STORAGE_KEY,

      JSON.stringify(data)
    );

    this.uploadSubject.next(
      data
    );

    console.log(
      'Certificate Saved'
    );
  }

  // GET
  getCertificate() {

    return this.upload$;
  }

  // CLEAR
  clearCertificate() {

    localStorage.removeItem(
      this.STORAGE_KEY
    );

    this.uploadSubject.next(
      null
    );
  }
}