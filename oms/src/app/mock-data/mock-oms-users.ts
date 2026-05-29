import {
  UserManagement
} from '../models/user-management.model';

export const MOCK_OMS_USERS:
  UserManagement[] = [

  {
    userId:
      'omsadmin',

    userName:
      'OMS Admin',

    emailAddress:
      'omsadmin@test.com',

    creationDate:
      '01/01/2026',

    status:
      'Active',

    merchantNumber:
      '9275640241'
  },

  {
    userId:
      'omsuser1',

    userName:
      'John OMS',

    emailAddress:
      'john@test.com',

    creationDate:
      '05/01/2026',

    status:
      'Active',

    merchantNumber:
      '9275640242'
  }
];