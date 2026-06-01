import {
  UploadCertificateData
} from '../models/upload-certificate.model';

export const MOCK_UPLOAD_CERTIFICATE:
  UploadCertificateData = {

  fileName:
    'vat-certificate.pdf',

  fileType:
    'application/pdf',

  uploadedAt:
    new Date().toISOString(),

  status:
    'success',

  statusMessage:
    'Certificate uploaded successfully'
};