import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchCardUser } from '../components/search-card-user';
@Component({
  selector: 'app-nx-welcome',
  imports: [CommonModule, SearchCardUser],
  templateUrl: './nx-welcome.html',
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcome {}
