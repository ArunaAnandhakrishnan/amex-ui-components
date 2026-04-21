import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface TravelRequest {
  id: string; traveler: string; destination: string; departure: string;
  returnDate: string; amount: number; status: 'approved' | 'pending' | 'rejected' | 'cancelled';
  type: string; purpose: string; bookedBy: string;
}

@Component({
  selector: 'app-bta-travel',
  template: `
    <div class="bta-travel">
      <div class="sub-nav">
        <div class="sub-nav-item" (click)="navigate('')">Dashboard</div>
        <div class="sub-nav-item active" (click)="navigate('travel')">Travel Requests</div>
        <div class="sub-nav-item" (click)="navigate('reports')">Expense Reports</div>
        <div class="sub-nav-item" (click)="navigate('settings')">Settings</div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px;">
        <div>
          <div class="page-title">Travel Requests</div>
          <div class="page-subtitle">Manage and track all corporate travel requests</div>
        </div>
        <button class="btn-primary" (click)="showNewForm = !showNewForm">
          {{ showNewForm ? '✕ Cancel' : '+ New Request' }}
        </button>
      </div>

      <!-- New Request Form -->
      <div class="card" *ngIf="showNewForm" style="margin-bottom:24px;">
        <div class="card-header">New Travel Request</div>
        <div class="card-body">
          <div class="form-row">
            <div class="form-field">
              <label>Traveler Name</label>
              <input type="text" [(ngModel)]="newReq.traveler" placeholder="Full name" />
            </div>
            <div class="form-field">
              <label>Travel Type</label>
              <select [(ngModel)]="newReq.type">
                <option>Conference</option>
                <option>Client Visit</option>
                <option>Internal Meeting</option>
                <option>Sales Call</option>
                <option>Training</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>Destination</label>
              <input type="text" [(ngModel)]="newReq.destination" placeholder="City, Country" />
            </div>
            <div class="form-field">
              <label>Purpose</label>
              <input type="text" [(ngModel)]="newReq.purpose" placeholder="Brief description" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-field">
              <label>Departure Date</label>
              <input type="date" [(ngModel)]="newReq.departure" />
            </div>
            <div class="form-field">
              <label>Return Date</label>
              <input type="date" [(ngModel)]="newReq.returnDate" />
            </div>
            <div class="form-field">
              <label>Estimated Amount ($)</label>
              <input type="number" [(ngModel)]="newReq.amount" placeholder="0.00" />
            </div>
          </div>
          <div style="display:flex;gap:10px;margin-top:8px;">
            <button class="btn-primary" (click)="submitRequest()">Submit Request</button>
            <button class="btn-secondary" (click)="showNewForm = false">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="card" style="margin-bottom:20px;">
        <div class="card-body" style="padding:14px 20px;">
          <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
            <span style="font-size:12px;font-weight:700;color:#888;text-transform:uppercase;">Filter:</span>
            <button *ngFor="let f of filters" class="filter-btn"
              [class.active]="activeFilter === f" (click)="activeFilter = f">
              {{ f }}
            </button>
            <input class="search-input" [(ngModel)]="searchTerm" placeholder="Search traveler or destination..." />
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="card">
        <div class="card-header">
          Travel Requests
          <span style="font-size:12px;color:#aaa;font-weight:400;">{{ filteredRequests.length }} results</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Traveler</th>
              <th>Destination</th>
              <th>Type</th>
              <th>Departure</th>
              <th>Return</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let req of filteredRequests">
              <td style="font-family:monospace;font-size:12px;color:#006fcf;">{{ req.id }}</td>
              <td><strong>{{ req.traveler }}</strong><br><span style="font-size:11px;color:#aaa;">{{ req.bookedBy }}</span></td>
              <td>{{ req.destination }}</td>
              <td><span class="badge badge-info">{{ req.type }}</span></td>
              <td style="font-size:12px;">{{ req.departure }}</td>
              <td style="font-size:12px;">{{ req.returnDate }}</td>
              <td><strong>\${{ req.amount.toLocaleString() }}</strong></td>
              <td>
                <span class="badge"
                  [class.badge-success]="req.status === 'approved'"
                  [class.badge-warning]="req.status === 'pending'"
                  [class.badge-danger]="req.status === 'rejected'"
                  [class.badge-info]="req.status === 'cancelled'">
                  {{ req.status | titlecase }}
                </span>
              </td>
              <td>
                <button *ngIf="req.status === 'pending'" class="action-btn approve"
                  (click)="updateStatus(req, 'approved')">✓</button>
                <button *ngIf="req.status === 'pending'" class="action-btn reject"
                  (click)="updateStatus(req, 'rejected')">✕</button>
                <button class="action-btn view">⋯</button>
              </td>
            </tr>
            <tr *ngIf="filteredRequests.length === 0">
              <td colspan="9" style="text-align:center;padding:32px;color:#aaa;">No requests match your filter.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .filter-btn {
      padding: 5px 14px; font-size: 12px; font-weight: 600;
      border: 1.5px solid #ddd; border-radius: 20px; cursor: pointer;
      background: #fff; color: #777; transition: all .15s;
    }
    .filter-btn:hover, .filter-btn.active {
      background: var(--color-primary); color: #fff; border-color: var(--color-primary);
    }
    .search-input {
      margin-left: auto; padding: 6px 12px; border: 1.5px solid #ddd;
      border-radius: 6px; font-size: 13px; width: 240px; outline: none;
    }
    .search-input:focus { border-color: var(--color-primary); }
    .action-btn {
      width: 28px; height: 28px; border: none; border-radius: 4px;
      cursor: pointer; font-size: 13px; margin-right: 4px; transition: all .15s;
    }
    .action-btn.approve { background: #e6f9f0; color: #1a7a4a; }
    .action-btn.approve:hover { background: #1a7a4a; color: #fff; }
    .action-btn.reject { background: #ffeaea; color: #cc0000; }
    .action-btn.reject:hover { background: #cc0000; color: #fff; }
    .action-btn.view { background: #f0f0f0; color: #555; }
    .action-btn.view:hover { background: #ddd; }
  `],
})
export class BtaTravelComponent {
  showNewForm = false;
  activeFilter = 'All';
  searchTerm = '';
  filters = ['All', 'Pending', 'Approved', 'Rejected'];

  newReq = { traveler: '', destination: '', departure: '', returnDate: '', amount: 0, type: 'Conference', purpose: '' };

  requests: TravelRequest[] = [
    { id: 'TR-2025-001', traveler: 'Sarah Johnson',    destination: 'New York, NY',     departure: '2025-06-10', returnDate: '2025-06-14', amount: 3200,  status: 'approved', type: 'Conference',      purpose: 'Q2 Leadership Summit',         bookedBy: 'Self' },
    { id: 'TR-2025-002', traveler: 'Michael Chen',     destination: 'London, UK',       departure: '2025-06-15', returnDate: '2025-06-22', amount: 8750,  status: 'pending',  type: 'Client Visit',    purpose: 'Barclays Account Review',      bookedBy: 'Travel Desk' },
    { id: 'TR-2025-003', traveler: 'Amanda Rodriguez', destination: 'Chicago, IL',      departure: '2025-06-18', returnDate: '2025-06-19', amount: 1400,  status: 'approved', type: 'Internal Meeting',purpose: 'Risk Team Workshop',           bookedBy: 'Self' },
    { id: 'TR-2025-004', traveler: 'David Park',       destination: 'San Francisco, CA',departure: '2025-06-20', returnDate: '2025-06-24', amount: 4100,  status: 'pending',  type: 'Sales Call',      purpose: 'New Client Onboarding',        bookedBy: 'Travel Desk' },
    { id: 'TR-2025-005', traveler: 'Emily Watson',     destination: 'Toronto, Canada',  departure: '2025-06-25', returnDate: '2025-06-27', amount: 2850,  status: 'rejected', type: 'Conference',      purpose: 'FinTech North 2025',           bookedBy: 'Self' },
    { id: 'TR-2025-006', traveler: 'James Liu',        destination: 'Singapore',        departure: '2025-07-02', returnDate: '2025-07-10', amount: 12400, status: 'pending',  type: 'Client Visit',    purpose: 'APAC Account Expansion',       bookedBy: 'Travel Desk' },
    { id: 'TR-2025-007', traveler: 'Priya Sharma',     destination: 'Dallas, TX',       departure: '2025-07-05', returnDate: '2025-07-06', amount: 980,   status: 'approved', type: 'Training',        purpose: 'Compliance Certification',     bookedBy: 'Self' },
    { id: 'TR-2025-008', traveler: 'Robert Taylor',    destination: 'Miami, FL',        departure: '2025-07-08', returnDate: '2025-07-11', amount: 2100,  status: 'cancelled',type: 'Sales Call',      purpose: 'Prospect Meeting — cancelled', bookedBy: 'Self' },
  ];

  get filteredRequests(): TravelRequest[] {
    return this.requests.filter(r => {
      const matchStatus = this.activeFilter === 'All' || r.status === this.activeFilter.toLowerCase();
      const matchSearch = !this.searchTerm ||
        r.traveler.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        r.destination.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchStatus && matchSearch;
    });
  }

  updateStatus(req: TravelRequest, status: 'approved' | 'rejected'): void {
    req.status = status;
  }

  submitRequest(): void {
    if (!this.newReq.traveler || !this.newReq.destination) return;
    this.requests.unshift({
      id: `TR-2025-00${this.requests.length + 1}`,
      ...this.newReq,
      status: 'pending',
      bookedBy: 'Self',
    });
    this.newReq = { traveler: '', destination: '', departure: '', returnDate: '', amount: 0, type: 'Conference', purpose: '' };
    this.showNewForm = false;
  }

  navigate(path: string): void {
    const url = path ? ['/bta', path] : ['/bta'];
    this.router.navigate(url);
  }

  constructor(private router: Router) {}
}
