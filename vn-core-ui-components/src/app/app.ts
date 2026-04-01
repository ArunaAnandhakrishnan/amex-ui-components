import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavItem { label: string; path: string; }
interface NavGroup { group: string; items: NavItem[]; }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  sidebarOpen = true;

  nav: NavGroup[] = [
    {
      group: 'Atoms',
      items: [
        { label: 'Button', path: '/atoms/button' },
        { label: 'Input', path: '/atoms/input' },
        { label: 'Textarea', path: '/atoms/textarea' },
        { label: 'Select', path: '/atoms/select' },
        { label: 'Checkbox', path: '/atoms/checkbox' },
        { label: 'Radio Group', path: '/atoms/radio-group' },
        { label: 'Badge', path: '/atoms/badge' },
        { label: 'Avatar', path: '/atoms/avatar' },
        { label: 'Spinner', path: '/atoms/spinner' },
        { label: 'Toggle', path: '/atoms/toggle' },
        { label: 'Tag', path: '/atoms/tag' },
        { label: 'Divider', path: '/atoms/divider' },
        { label: 'Progress Bar', path: '/atoms/progress-bar' },
        { label: 'Alert', path: '/atoms/alert' },
        { label: 'Icon Button', path: '/atoms/icon-button' },
        { label: 'Breadcrumb', path: '/atoms/breadcrumb' },
        { label: 'Pagination', path: '/atoms/pagination' },
      ],
    },
    {
      group: 'Molecules',
      items: [
        { label: 'Form Field', path: '/molecules/form-field' },
        { label: 'Form Group', path: '/molecules/form-group' },
        { label: 'Card', path: '/molecules/card' },
        { label: 'Modal', path: '/molecules/modal' },
        { label: 'Tabs', path: '/molecules/tabs' },
        { label: 'Accordion', path: '/molecules/accordion' },
        { label: 'Search Bar', path: '/molecules/search-bar' },
        { label: 'Date Input', path: '/molecules/date-input' },
        { label: 'File Upload', path: '/molecules/file-upload' },
        { label: 'Notification Toast', path: '/molecules/notification-toast' },
      ],
    },

    // Add these two groups to the nav array:
{
  group: 'AMEX Atoms',
  items: [
    { label: 'Card Badge',     path: '/amex/atoms/card-badge' },
    { label: 'Status Badge',   path: '/amex/atoms/status-badge' },
    { label: 'Account Number', path: '/amex/atoms/account-number' },
    { label: 'Points Display', path: '/amex/atoms/points-display' },
    { label: 'Amount',         path: '/amex/atoms/amount' },
    { label: 'Reference ID',   path: '/amex/atoms/reference-id' },
  ],
},
{
  group: 'AMEX Molecules',
  items: [
    { label: 'Statement Row',   path: '/amex/molecules/statement-row' },
    { label: 'Card Tile',       path: '/amex/molecules/card-tile' },
    { label: 'Report Table',    path: '/amex/molecules/report-table' },
    { label: 'Audit Trail Row', path: '/amex/molecules/audit-trail-row' },
    { label: 'Offer Card',      path: '/amex/molecules/offer-card' },
    { label: 'Wearable Tile',   path: '/amex/molecules/wearable-tile' },
    { label: 'User Row',        path: '/amex/molecules/user-row' },
  ],
},
{
      group: 'AMEX Feedback',
      items: [
        { label: 'Success Toast',               path: '/amex/feedback' },
        { label: 'Error Toast',                 path: '/amex/feedback' },
        { label: 'Inline Validation Error',     path: '/amex/feedback' },
        { label: 'Confirmation Modal',          path: '/amex/feedback' },
        { label: 'Duplicate Warning',           path: '/amex/feedback' },
        { label: 'File Upload Progress',        path: '/amex/feedback' },
        { label: 'Reset Password Confirm',      path: '/amex/feedback' },
      ],
    },

{
  group: 'AMEX Navigation',
  items: [
    { label: 'Top Nav Bar',         path: '/amex/navigation' },
    { label: 'Tab Bar',             path: '/amex/navigation' },
    { label: 'Sidebar Menu',        path: '/amex/navigation' },
    { label: 'Portal Home Tiles',   path: '/amex/navigation' },
    { label: 'Dashboard Menu Bar',  path: '/amex/navigation' },
    { label: 'Page Header',         path: '/amex/navigation' },
    { label: 'Breadcrumb Trail',    path: '/amex/navigation' },
    { label: 'Logout Confirmation', path: '/amex/navigation' },
  ],
},
  ];
}
