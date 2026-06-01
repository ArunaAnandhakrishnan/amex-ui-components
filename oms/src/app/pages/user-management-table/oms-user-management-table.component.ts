import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  AmexUserManagementTableComponent
} from '@vn-core-ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-user-management-table',

  standalone: true,

  imports: [
    CommonModule,
    AmexUserManagementTableComponent
  ],

  templateUrl:
    './oms-user-management-table.component.html',

  styles: [`

    :host {

      width: 100%;
    }

  `]
})
export class OmsUserManagementTableComponent {

  @Input()
  title =
    'MRM USER ADMINISTRATION';

  @Input()
  createLabel =
    'Create MRM User';

  @Input()
  showDelete = true;

  @Input()
  showMerchantNumber = false;

  @Output()
  editUserClicked = new EventEmitter<any>();

  @Output()
  deleteUserClicked = new EventEmitter<any>();

  @Input()
  rows: any[] = [

    {
      userId:
        'mrmadmin',

      userName:
        'Essa',

      emailAddress:
        'essa.memon@americanexpress.com.bh',

      creationDate:
        '09/09/2021',

      status:
        'Inactive'
    },

    {
      userId:
        'wasimtest123',

      userName:
        'wasimtest123',

      emailAddress:
        'wasim.sayyed@americanexpress.com.bh',

      creationDate:
        '05/05/2024',

      status:
        'Active'
    },

    {
      userId:
        'mrmadmintest4',

      userName:
        'mrmadminketaki',

      emailAddress:
        'ketaki_pore@yahoo.com',

      creationDate:
        '09/09/2021',

      status:
        'Active'
    },

    {
      userId:
        'ketakimrm12',

      userName:
        'Ketaki',

      emailAddress:
        'ketaki.pore222@gmail.com',

      creationDate:
        '08/09/2021',

      status:
        'Active'
    }
  ];

  @Output()
  createUserClicked = new EventEmitter<void>();

  handleClick(event: any) {

  const text =
    event.target?.innerText?.trim();

  console.log(
    'Clicked:',
    text
  );

  // CREATE
  if (
    text?.toLowerCase()
      .includes('create')
  ) {

    this.createUserClicked.emit();
  }

  // EDIT
  if (
    text?.toLowerCase()
      .includes('edit')
  ) {

    // MOCK SELECTED USER
    const selectedUser =
      this.rows[0];

    this.editUserClicked.emit(
      selectedUser
    );
  }

  // DELETE
  if (
    text?.toLowerCase()
      .includes('delete')
  ) {

    // MOCK SELECTED USER
    const selectedUser =
      this.rows[0];

    console.log(
      'Delete User:',
      selectedUser
    );

    this.deleteUserClicked.emit(
      selectedUser
    );
  }
}

get rowsWithoutMerchantNumber() {

  return this.rows.map(
    ({
      merchantNumber,
      ...rest
    }) => rest
  );
}


}