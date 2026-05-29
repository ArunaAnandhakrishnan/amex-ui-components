import {
  ReportFormatData
} from '../models/report-format.model';

export const MOCK_REPORT_FORMAT:
  ReportFormatData = {

  emailReports: true,

  emailAddresses: [

    'merchant@test.com',

    'finance@test.com'
  ],

  settlementAdvice:
    'pdf',

  submissionDetails:
    'excel'
};