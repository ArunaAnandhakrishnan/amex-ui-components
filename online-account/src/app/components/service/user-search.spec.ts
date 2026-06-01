import { TestBed } from '@angular/core/testing';

import { UserSearch } from './user-search';

describe('UserSearch', () => {
  let service: UserSearch;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSearch);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
