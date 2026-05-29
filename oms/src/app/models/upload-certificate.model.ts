export interface UploadCertificateData {

  fileName: string;

  fileType: string;

  uploadedAt: string;

  status:
    'idle'
    | 'success'
    | 'error';

  statusMessage: string;
}