import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonDetails } from './season-details';

describe('SeasonDetails', () => {
  let component: SeasonDetails;
  let fixture: ComponentFixture<SeasonDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(SeasonDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
