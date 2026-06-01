import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchCardUser } from './search-card-user';

describe('SearchCardUser', () => {
  let component: SearchCardUser;
  let fixture: ComponentFixture<SearchCardUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchCardUser],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchCardUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
