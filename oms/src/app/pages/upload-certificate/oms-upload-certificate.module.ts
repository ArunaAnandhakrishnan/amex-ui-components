import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  OmsUploadCertificateComponent
} from './oms-upload-certificate.component';

@NgModule({
  imports: [
    OmsUploadCertificateComponent,
    RouterModule.forChild([
      {
        path: '',
        component:
          OmsUploadCertificateComponent
      }
    ])
  ]
})
export class OmsUploadCertificateModule {}