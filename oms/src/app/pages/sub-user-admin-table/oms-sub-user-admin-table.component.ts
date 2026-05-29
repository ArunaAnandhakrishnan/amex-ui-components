import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  AmexSubUserAdminTableComponent
} from '@vn-core-ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-sub-user-admin-table',

  standalone: true,

  imports: [
    CommonModule,
    AmexSubUserAdminTableComponent
  ],

  templateUrl:
    './oms-sub-user-admin-table.component.html',

  styles: [`

    :host {

      width: 100%;
    }

  `]
})
export class OmsSubUserAdminTableComponent {

  @Input()
  title =
    'SUB USER ADMINISTRATION';

  @Input()
  showCreate = true;

  @Input()
  createLabel =
    'Create Sub User';

  @Output()
  createUserClicked = new EventEmitter<void>();

  @Output()
editUserClicked =
  new EventEmitter<any>();

@Output()
deleteUserClicked =
  new EventEmitter<any>();

selectedRow: any = null;

  @Input()
  rows = [

    {
      name:
        'Ahmed Al Mansouri',

      email:
        'ahmed@merchant.ae',

      role:
        'Sub User',

      status:
        'Active'
    },

    {
      name:
        'Sara Khalid',

      email:
        'sara@merchant.ae',

      role:
        'VAT User',

      status:
        'Active'
    },

    {
      name:
        'Omar Hassan',

      email:
        'omar@merchant.ae',

      role:
        'Sub User',

      status:
        'Inactive'
    }
  ];

handleAction(event: any) {

  console.log(
    'TABLE ACTION:',
    event
  );

  // EDIT
  if (
    event?.action === 'edit'
  ) {

    this.editUserClicked.emit(
      event.row
    );
  }

  // DELETE
  if (
    event?.action === 'delete'
  ) {

    this.deleteUserClicked.emit(
      event.row
    );
  }
}

}