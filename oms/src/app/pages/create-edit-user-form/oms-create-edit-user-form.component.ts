import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  AmexMRMCreateEditUserFormComponent
} from '@vn-core-ui-components/ui';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'oms-create-edit-user-form',

  standalone: true,

  imports: [
    CommonModule,
    AmexMRMCreateEditUserFormComponent
  ],

  templateUrl:
    './oms-create-edit-user-form.component.html',

  styles: [`

    :host {

      width: 100%;
    }

  `]
})
export class OmsCreateEditUserFormComponent {

  @Input()
  title =
    'CREATE USER';

  @Input()
  showMerchantAccess = true;

  @Output()
  saveClicked =
    new EventEmitter<any>();

  onSave(
  event: any
) {

  console.log(
  'FULL FORM EVENT:',
  JSON.stringify(
    event,
    null,
    2
  )
);

  alert(
    'Save Triggered'
  );

  this.saveClicked.emit(
    event
  );
}
}