import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AmexPageHeaderComponent,
  AmexBreadcrumbTrailComponent,
  AmexStatusBadgeComponent,
  AmexAuditTrailRowComponent,
  AmexUserRowComponent,
} from '@vn-core-ui-components/ui';

interface BtaUser {
  userId: string;
  fullName: string;
  email: string;
  creationDate: string;
  accountStatus: string;
  permissions: string;
  country: string;
  travelAgent: string;
  type: string;
}

@Component({
    selector: 'app-bta-user-management',
    imports: [
        CommonModule, FormsModule,
        AmexPageHeaderComponent,
        AmexBreadcrumbTrailComponent,
        AmexStatusBadgeComponent,
    ],
    template: `
    <amex-page-header portalStyle="onls" title="CORPORATION USER MANAGEMENT"></amex-page-header>
    <amex-breadcrumb-trail
      [items]="[{id:'home',label:'Home'},{id:'bta',label:'BTA Portal'},{id:'um',label:'User Management'}]"
      [showBack]="true" (backClick)="goBack()">
    </amex-breadcrumb-trail>

    <div class="bta-page">

      <!-- Add User form -->
      <div *ngIf="showAddUser" class="bta-panel">
        <div class="bta-panel-hd">New Corporation User Account</div>
        <div class="bta-panel-bd">
          <p class="bta-mandatory-note">All fields marked <span class="req">*</span> are mandatory</p>
          <div class="bta-form-grid">
            <div class="bta-field"><label>Salutation <span class="req">*</span></label>
              <select [(ngModel)]="newUser.salutation"><option>Select</option><option>Mr</option><option>Ms</option><option>Mrs</option><option>Dr</option></select>
            </div>
            <div class="bta-field"><label>Full Name <span class="req">*</span></label><input type="text" [(ngModel)]="newUser.fullName"/></div>
            <div class="bta-field"><label>Job Title</label><input type="text" [(ngModel)]="newUser.jobTitle"/></div>
            <div class="bta-field"><label>Business Phone Number <span class="req">*</span></label>
              <div class="phone-row"><input class="phone-cc" type="text" [(ngModel)]="newUser.phoneCC" placeholder="+"/><input class="phone-num" type="text" [(ngModel)]="newUser.phone"/></div>
            </div>
            <div class="bta-field"><label>Mobile Number</label>
              <div class="phone-row"><input class="phone-cc" type="text" [(ngModel)]="newUser.mobileCC" placeholder="+"/><input class="phone-num" type="text" [(ngModel)]="newUser.mobile"/></div>
            </div>
            <div class="bta-field"><label>Email Address <span class="req">*</span></label><input type="email" [(ngModel)]="newUser.email"/></div>
            <div class="bta-field"><label>Confirm Email Address <span class="req">*</span></label><input type="email" [(ngModel)]="newUser.emailConfirm"/></div>
            <div class="bta-field"><label>Country <span class="req">*</span></label>
              <select [(ngModel)]="newUser.country"><option value="">Select a Country</option><option>Bahrain</option><option>UAE</option><option>Saudi Arabia</option><option>Kuwait</option><option>Qatar</option><option>Oman</option></select>
            </div>
            <div class="bta-field">
              <label>User Type <span class="req">*</span></label>
              <div class="radio-group">
                <label><input type="radio" [(ngModel)]="newUser.userType" value="admin"/> Administrator</label>
                <label><input type="radio" [(ngModel)]="newUser.userType" value="user"/> User</label>
              </div>
            </div>
            <div class="bta-field"><label>User ID <span class="req">*</span></label><input type="text" [(ngModel)]="newUser.userId"/></div>
          </div>
          <div class="bta-actions">
            <button class="bta-btn bta-btn-secondary" (click)="showAddUser=false">Cancel</button>
            <button class="bta-btn bta-btn-primary" (click)="submitNewUser()">Submit</button>
          </div>
        </div>
      </div>

      <!-- User list -->
      <div *ngIf="!showAddUser" class="bta-panel">
        <div class="bta-panel-hd">List of Users for TEST BTA 9</div>
        <div class="bta-panel-bd">
          <table class="bta-table">
            <thead>
              <tr>
                <th>User ID</th><th>Full Name</th><th>Email Address</th>
                <th>Account Creation Date</th><th>Account Status</th>
                <th>Permissions</th><th>Country</th><th>Travel Agent</th><th>Type</th><th></th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let u of users">
                <td>{{ u.userId }}</td>
                <td>{{ u.fullName }}</td>
                <td>{{ u.email }}</td>
                <td>{{ u.creationDate }}</td>
                <td><amex-status-badge [status]="getStatus(u.accountStatus)" [label]="u.accountStatus"></amex-status-badge></td>
                <td>{{ u.permissions }}</td>
                <td>{{ u.country }}</td>
                <td>{{ u.travelAgent }}</td>
                <td>{{ u.type }}</td>
                <td><a class="bta-link" (click)="editUser(u)">Edit</a></td>
              </tr>
            </tbody>
          </table>
          <div class="bta-actions-row">
            <button class="bta-btn bta-btn-secondary" (click)="editMyDetails()">Edit My Details</button>
            <button class="bta-btn bta-btn-primary" (click)="showAddUser=true">Create New User</button>
          </div>
        </div>
      </div>

    </div>
  `,
    styles: [`
    .bta-page        { padding:0 16px 24px; background:#fff; }
    .bta-panel       { border:1px solid #b8d0e8; border-radius:2px; overflow:hidden; margin-top:12px; }
    .bta-panel-hd    { background:#cfe2f3; border-bottom:1px solid #b8d0e8; padding:8px 14px; font-size:13px; font-weight:bold; color:#1e3a6e; }
    .bta-panel-bd    { padding:16px; }
    .bta-mandatory-note { font-size:12px; color:#555; margin-bottom:14px; }
    .req             { color:#cc0000; }
    .bta-form-grid   { display:grid; grid-template-columns:1fr 1fr; gap:12px 24px; }
    .bta-field       { display:flex; flex-direction:column; gap:4px; }
    .bta-field label { font-size:12px; color:#333; }
    .bta-field input,.bta-field select { border:1px solid #aaa; padding:4px 8px; font-size:12px; font-family:Arial,sans-serif; border-radius:1px; }
    .phone-row       { display:flex; gap:6px; }
    .phone-cc        { width:50px; }
    .phone-num       { flex:1; }
    .radio-group     { display:flex; flex-direction:column; gap:4px; }
    .radio-group label { display:flex; align-items:center; gap:6px; font-size:12px; }
    .bta-actions     { display:flex; gap:10px; justify-content:flex-end; margin-top:16px; }
    .bta-actions-row { display:flex; justify-content:space-between; margin-top:14px; }
    .bta-btn         { padding:5px 16px; font-size:12px; font-family:Arial,sans-serif; cursor:pointer; border-radius:2px; }
    .bta-btn-primary  { background:#1e3a6e; color:#fff; border:1px solid #1e3a6e; }
    .bta-btn-primary:hover { background:#2d5499; }
    .bta-btn-secondary { background:#fff; color:#333; border:1px solid #aaa; }
    .bta-btn-secondary:hover { background:#f5f5f5; }
    .bta-table       { width:100%; border-collapse:collapse; font-size:12px; }
    .bta-table th    { background:#cfe2f3; border:1px solid #b8d0e8; padding:7px 10px; text-align:left; font-weight:bold; color:#1e3a6e; white-space:nowrap; }
    .bta-table td    { border:1px solid #dde4ed; padding:7px 10px; vertical-align:top; }
    .bta-table tr:hover td { background:#f5f9ff; }
    .bta-link        { color:#006fcf; cursor:pointer; text-decoration:underline; font-size:12px; }
  `]
})
export class BtaUserManagementComponent {
  showAddUser = false;

  newUser = {
    salutation: 'Select', fullName: '', jobTitle: '',
    phoneCC: '', phone: '', mobileCC: '', mobile: '',
    email: '', emailConfirm: '', country: '', userType: 'user', userId: '',
  };

  users: BtaUser[] = [
    { userId:'test44332244', fullName:'test', email:'zeeshan.ahmed@americanexpress.com.bh',
      creationDate:'05/04/2018', accountStatus:'Cancelled',
      permissions:'Audit Trail, Payment Allocation', country:'Armenia',
      travelAgent:'DNATA (BTA)', type:'User' },
    { userId:'BTAADM001', fullName:'Ahmed Al-Rashid', email:'ahmed.rashid@corp.com',
      creationDate:'12/01/2023', accountStatus:'Active',
      permissions:'All', country:'UAE', travelAgent:'DNATA (BTA)', type:'Administrator' },
    { userId:'BTAUSR002', fullName:'Sara Khalil', email:'sara.khalil@corp.com',
      creationDate:'15/03/2023', accountStatus:'Active',
      permissions:'Memo Statement, Monthly Statement', country:'Bahrain',
      travelAgent:'DNATA (BTA)', type:'User' },
  ];

  getStatus(s: string): any {
    const map: Record<string,string> = {
      'Active':'active','Cancelled':'expired','Suspended':'locked','Pending':'pending',
    };
    return map[s] || 'inactive';
  }
  editUser(u: BtaUser) { alert(`Edit user: ${u.userId}`); }
  editMyDetails() { alert('Edit My Details'); }
  submitNewUser() { this.showAddUser = false; }
  goBack() {}
}
