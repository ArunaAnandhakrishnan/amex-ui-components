import {
  ContactInformation
} from '../models/contact-information.model';

export const MOCK_CONTACT_INFORMATION:
  ContactInformation[] = [

  // CONTACT INFORMATION
  {
    sectionTitle:
      'CONTACT INFORMATION',

    name:
      'Ahmed Ali',

    email:
      'ahmed@test.com',

    phone:
      '501234567',

    countryCode:
      '+971',

    designation:
      'Manager'
  },

  // MARKETING INFORMATION
  {
    sectionTitle:
      'Marketing Information',

    name:
      'Sara Khan',

    email:
      'sara@test.com',

    phone:
      '987654321',

    countryCode:
      '+971',

    designation:
      'Marketing Lead'
  },

  // FINANCE INFORMATION
  {
    sectionTitle:
      'Finance Information',

    name:
      'John Finance',

    email:
      'finance@test.com',

    phone:
      '888888888',

    countryCode:
      '+91',

    designation:
      'Finance Manager'
  },

  // OPERATIONS
  {
    sectionTitle:
      'Operations',

    name:
      'Omar Ops',

    email:
      'ops@test.com',

    phone:
      '777777777',

    countryCode:
      '+1',

    designation:
      'Operations Head'
  }

];