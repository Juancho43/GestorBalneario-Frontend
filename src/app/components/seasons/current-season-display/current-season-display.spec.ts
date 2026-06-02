import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CurrentSeasonDisplay} from './current-season-display';

describe('CurrentSeasonDisplay', () => {
  let component: CurrentSeasonDisplay;
  let fixture: ComponentFixture<CurrentSeasonDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentSeasonDisplay],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentSeasonDisplay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
