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
  ];
}
