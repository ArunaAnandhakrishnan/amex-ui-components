import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
    selector: 'bta-entry',
    template: `
    <div class="bta-shell">
      <!-- Left nav panel — matches document NAVIGATION sidebar exactly -->
      <div class="bta-nav">
        <div class="bta-nav-hd">NAVIGATION</div>
        <a *ngFor="let item of navItems"
           class="bta-nav-item"
           [class.active]="isActive(item.path)"
           (click)="navigate(item.path)">{{ item.label }}</a>
      </div>
      <div class="bta-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
    styles: [`
    .bta-shell    { display:flex; min-height:100%; font-family:Arial,sans-serif; }
    .bta-nav      { width:150px; flex-shrink:0; border-right:1px solid #b8d0e8; background:#fff; }
    .bta-nav-hd   { background:#1e3a6e; color:#fff; font-size:12px; font-weight:bold; padding:8px 12px; text-align:center; letter-spacing:.04em; }
    .bta-nav-item { display:block; padding:7px 12px; font-size:12px; color:#006fcf; cursor:pointer; border-bottom:1px solid #e8f0f8; text-decoration:none; }
    .bta-nav-item:hover  { background:#e8f0f8; text-decoration:underline; }
    .bta-nav-item.active { background:#cfe2f3; color:#1e3a6e; font-weight:bold; }
    .bta-content  { flex:1; overflow:auto; min-width:0; }
  `],
    standalone: false
})
export class BtaEntryComponent {
  navItems = [
    { label:'User Management',    path:'user-management'    },
    { label:'Memo Statement',     path:'memo-statement'     },
    { label:'Large Reports',      path:'large-reports'      },
    { label:'Monthly Statements', path:'monthly-statement'  },
    { label:'Payment Allocation', path:'payment-allocation' },
    { label:'Audit Trail',        path:'audit-trail'        },
    { label:'Case Management',    path:'case-management'    },
    { label:'TMC Transactions',   path:'tmc-transactions'   },
  ];

  constructor(private router: Router) {}

  navigate(path: string) {
    const segs = this.router.url.split('/').filter(Boolean);
    const base = segs[0] === 'bta' ? '/bta' : '';
    this.router.navigate([`${base}/${path}`]);
  }

  isActive(path: string): boolean {
    return this.router.url.includes(path);
  }
}

const routes: Routes = [
  {
    path: '',
    component: BtaEntryComponent,
    children: [
      { path: '', redirectTo: 'user-management', pathMatch: 'full' },
      { path: 'user-management',   loadChildren: () => import('../pages/user-management/bta-user-management.module').then(m => m.BtaUserManagementModule)     },
      { path: 'memo-statement',    loadChildren: () => import('../pages/memo-statement/bta-memo-statement.module').then(m => m.BtaMemoStatementModule)         },
      { path: 'large-reports',     loadChildren: () => import('../pages/large-reports/bta-large-reports.module').then(m => m.BtaLargeReportsModule)           },
      { path: 'monthly-statement', loadChildren: () => import('../pages/monthly-statement/bta-monthly-statement.module').then(m => m.BtaMonthlyStatementModule) },
      { path: 'payment-allocation',loadChildren: () => import('../pages/payment-allocation/bta-payment-allocation.module').then(m => m.BtaPaymentAllocationModule) },
      { path: 'audit-trail',       loadChildren: () => import('../pages/audit-trail/bta-audit-trail.module').then(m => m.BtaAuditTrailModule)                 },
      { path: 'case-management',   loadChildren: () => import('../pages/case-management/bta-case-management.module').then(m => m.BtaCaseManagementModule)     },
      { path: 'tmc-transactions',  loadChildren: () => import('../pages/tmc-transactions/bta-tmc-transactions.module').then(m => m.BtaTmcTransactionsModule)   },
    ],
  },
];

@NgModule({
  declarations: [BtaEntryComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class BtaRemoteEntryModule {}
