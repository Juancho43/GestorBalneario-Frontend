import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSeasonSwitcher } from './current-season-switcher';

describe('CurrentSeasonSwitcher', () => {
  let component: CurrentSeasonSwitcher;
  let fixture: ComponentFixture<CurrentSeasonSwitcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentSeasonSwitcher],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentSeasonSwitcher);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
